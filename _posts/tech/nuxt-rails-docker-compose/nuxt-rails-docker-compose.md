---
title: Nuxt.js + Rails APIをDocker上で立ち上げCRUD操作してみる
date: "2020-12-15"
---

今回初めて Nuxt.js を触りました。
Todo アプリを作ろうかなと思ったのですが, せっかくなら API を叩こうじゃないかということでサーバーサイドも用意してみました。

サーバーサイドは Ruby on Rails(API), クライアントサイドは Nuxt.ts(Nuxt.js + TypeScript), DB は postgres という構成で実装していきます。

環境構築に関しては, サーバーサイド/クライアンドサイド共に Docker 上で動かしており, ディレクトリ構成はモノシリックにまとめました。

↓ ソースコードはこちら  
[![Kazuhiro-Mimaki/nuxt-rails-crud - GitHub](https://gh-card.dev/repos/Kazuhiro-Mimaki/nuxt-rails-crud.svg)](https://github.com/Kazuhiro-Mimaki/nuxt-rails-crud)

# 動作環境

macOS Catalina : version 10.15.4
Docker for mac はインストール済みとする。

# ディレクトリ構成

```
├── client-side
├── server-side
└── docker-compose.yml
```

# 1. サーバーサイド(Ruby on Rails)

## Dockerfile 作成

`server-side/` 配下に dockerfile を作成。

```yml:Dockerfile
FROM ruby:2.7.0

RUN apt-get update -qq && \
  apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  postgresql-client

WORKDIR /app

COPY Gemfil Gemfile.lock /app/
RUN bundle install
```

## Gemfile, Gemfile.lock 作成

同じく `server-side/` 配下に Gemfile と Gemfile.lock を作成。

Gemfile 内に以下を記述。

```ruby:Gemfile
source 'https://rubygems.org'
gem 'rails', '6.0.3'
```

Gemfile.lock は空のままで大丈夫。

## docker-compose.yml 作成

rails と postgres の設定を docker-compose.yml に書いていきます。

```yml:docker-compose.yml
version: '3.8'

volumes:
  db_data:

  services:
    db:
      image: postgres
      volumes:
        - db_data/var/lib/postgresql/data
      environment:
        POSTGRES_PASSWORD: password

    server-side:
      build: ./server-side/
      command: bundle exec rails server -b 0.0.0.0
      image: server-side
      ports:
        - 3000:3000
      volumes:
        - ./server-side:/server-app
      tty: true
      stdin_open: true
      depends_on:
        - db
      links:
        - db
```

## API モードで `rails new`

以下のコマンドを叩けば, `server-side/` 配下に rails 関連のファイル群が作成されます。

```terminal
$ docker-compose run server-side rails new . --api --force --database=postgresql --skip-bundle
```

## `database.yml` の内容を修正

このままだと server-side のコンテナから DB のコンテナにアクセスできないので `database.yml` の内容を修正します。

以下のようになっていると思うので

```yml:database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

以下のように編集。

```yml:database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  host: db
  user: postgres
  password: password
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

# `server-side` ホストを受け入れるように修正

この設定をすることで, Nuxt から server-side にアクセスできます。

```ruby:server-side/config/environments/development.rb
config.hosts << "server-side"
```

## DB を作成

以下のコマンドを叩いて db を作成。

```terminal
$ docker-compose run server-side rails db:create
```

## 動作させてみる

以下のコマンドを打って, `localhost:3000` にアクセス。
rails のデフォ画面が表示されれば OK！

```terminal
$ docker-compose up -d
```

## サーバーサイドの API を実装

以下のコマンドを叩き, コンテナの中に入った上で作業を進めていきます。

```terminal
$ docker exec -it server-side bash
```

ルーティングを設定。

```ruby:routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :todos do
        collection do
          get :complete
        end
      end
    end
  end
end
```

Todo モデル, todos コントローラーを作成。

```terminal
$ rails g model Todo title:string isDone:boolean
$ rails db:migrate
$ rails g controller api::v1::todos
```

controller の中身は以下のように書きました。

```ruby:api/app/controllers/api/v1/posts_controller.rb
class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [:update, :destroy]

  def index
    todos = Todo.where(isDone: false)
    render json: { status: 'SUCCESS', message: 'Loaded todos', data: todos }
  end

  def complete
    todos = Todo.where(isDone: true)
    render json: { status: 'SUCCESS', message: 'Loaded todos', data: todos }
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: { status: 'SUCCESS', data: todo }
    else
      render json: { status: 'ERROR', data: todo.errors }
    end
  end

  def destroy
    @todo.destroy
    render json: { status: 'SUCCESS', message: 'Deleted the todo', data: @todo }
  end

  def update
    if @todo.update(todo_params)
      render json: { status: 'SUCCESS', message: 'Updated the todo', data: @todo }
    else
      render json: { status: 'ERROR', message: 'Not updated', data: @todo.errors }
    end
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title, :isDone)
    end
end

```

## 動作確認

[この記事](https://qiita.com/k-penguin-sato/items/adba7a1a1ecc3582a9c9)を参考に, Postman を利用して CRUD 操作ができるかどうか確認します。
curl コマンドでも確認できますが, たぶん Postman の方が楽。

# 2. クライアントサイド(Nuxt.js)

## 環境構築

基本的には [公式の Installation](https://nuxtjs.org/docs/2.x/get-started/installation) に沿って進めるだけ。
node はインストール済みとします。(今回の環境では 12/15 現時点での LTS ver. 14.15.1 を使用しています。)

## プロジェクトの作成

まずは `create-nuxt-app` で雛形作りましょう。

```terminal
$ npx create-nuxt-app client-side
```

色々質問されると思うのですが, 今回は以下のように設定しました。(その他はデフォルト)

```terminal
? Project name: client-side
? Programming language: TypeScript
? Package manager: Yarn
? UI framework: None
? Nuxt.js modules: Axios
? Linting tools: None
? Testing framework: None
? Rendering mode: Single Page App
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: None
? Version control system: None
```

この辺りの設定は各自の好みで設定してください。
全てのオプションは [ここから](https://github.com/nuxt/create-nuxt-app/blob/master/README.md) 確認できます。

## Dockerfile 作成

`client-side/` 配下に Dockerfile を作成。

```yml:Dockerfile:Dockerfile
FROM node:14.15.1

WORKDIR /client-app

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "dev"]
```

## docker-compose.yml に `client-side` の設定を追加

`server-side` の設定を記述した docker-compose.yml に `client-side` の設定を追加します。

```yml:docker-compose.yml
version: '3.8'

volumes:
  db_data:

services:
  db:
    image: postgres
    volumes:
      - db_data/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password

  server-side:
    build: ./server-side/
    image: server-side
    ports:
      - 3000:3000
    volumes:
      - ./server-side:/server-app
    command: bundle exec rails server -b 0.0.0.0
    tty: true
    stdin_open: true
    depends_on:
      - db
    links:
      - db

  # ここから下を追加
  client-side:
    build: ./client-side/
    image: client-side
    ports:
      - 8000:8000
    volumes:
      - ./client-side:/client-app
      - /client-app/node_modules
    command: sh -c "yarn && yarn dev"
```

## port の設定

このままだとエラーが出るので, port と host を以下のように設定します。

```js:nuxt.config.js
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // ここを追記
  server: {
    port: 8000,
    host: '0.0.0.0',
  },

// 以下省略
}
```

## 動作させてみる

以下のコマンドを打って, `localhost:8000` にアクセスすると Nuxt.js のデフォ画面が表示されます。

```terminal
$ docker-compose up -d
```

これで環境構築は完了！

# 3. サーバーサイドとクライアントサイドの連携

いよいよクライアント側からサーバーサイドの API を叩きにいきます。
感動の瞬間。。。

## CORS (オリジン間リソース共有) 問題を解消

CORS については [こちらの記事](https://qiita.com/att55/items/2154a8aad8bf1409db2b) が参考になると思います。
[公式](https://nuxtjs.org/faq/http-proxy/)と[GitHub の README](https://github.com/nuxt-community/proxy-module#readme)に解決方法がありました。
README の記述を参考に `@nuxtjs/proxy` をインストールし, `app/nuxt.config.js` を以下のように編集します。
サーバーサイドのポート番号をは 3000 で指定していたので, ここは `server-side:3000`で。(コンテナ間の通信はコンテナ名で解決するため, `localhost`ではなく`server-side`にしている。)

```terminal
$ yarn add @nuxtjs/proxy
```

```js:app/nuxt.config.js
modules: [
  '@nuxtjs/axios',
  '@nuxtjs/proxy'
],
// 以下を追加
proxy: {
  '/api': {
    target: 'http://server-side:3000',
    pathRewrite: {
      '^/api': '/api/v1/',
    },
  },
},
```

## Composition API と axios を設定

この辺り使いたいので設定しましたが, なくても CRUD 操作はできます。

```:shell
$ yarn add @nuxtjs/composition-api
```

```js:client-side/nuxt.config.js
modules: [
  '@nuxtjs/proxy',
  //追加
  '@nuxtjs/axios',
  '@nuxtjs/composition-api',
],
```

```json:client-side/tsconfig.json
"types": [
  "@types/node",
  "@nuxt/types",
  #追加
  "@nuxtjs/axios"
]
```

## 型定義

`client-side` に新たに `models/todo.ts` ディレクトリを作り, 以下を記述。

```ts:todo.ts
export interface ITodo {
  id: number;
  title: string;
  isDone: boolean;
}
```

## view を記述

本当はコンポーネントに分割して書くべきですが, 今回は 1 ファイルにまとめた方が見やすいかなと思ったのでまとめます。

`client-side/pages/index.vue` に以下の内容を記述。

```ts:client-side/pages/index.vue
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
} from "@nuxtjs/composition-api";
import { ITodo } from "../models/todo";
import $axios from "@nuxtjs/axios";

export default defineComponent({
  setup(_, { root }) {
    onMounted(() => {
      getTodo();
    });

    const todoItem = reactive({
      title: "",
      isDone: false,
    });

    const todoList = ref<ITodo[]>([]);
    const completeTodoList = ref<ITodo[]>([]);

    // todoをpost
    const addTodo = async () => {
      try {
        await root.$axios.post("/api/todos/", {
          title: todoItem.title,
          isDone: todoItem.isDone,
        });
        getTodo();
        todoItem.title = "";
      } catch (e) {
        console.log(e);
      }
    };

    // todoをget
    const getTodo = async () => {
      try {
        const response = await root.$axios.get("/api/todos");
        todoList.value = { ...response.data.data };
        getCompleteTodo();
      } catch (e) {
        console.log(e);
      }
    };

    // todoをupdate
    const updateTodo = async (i: number, todo: ITodo) => {
      try {
        const newTodo = todoList.value[i].title;
        await root.$axios.patch(`/api/todos/${todo.id}`, { title: newTodo });
      } catch (e) {
        console.log(e);
      }
    };

    // todoをdelete
    const deleteTodo = async (id: number) => {
      try {
        await root.$axios.delete(`/api/todos/${id}`);
        getTodo();
      } catch (e) {
        console.log(e);
      }
    };

    // todoをdone
    const completeTodo = async (todo: ITodo) => {
      try {
        todo.isDone = !todo.isDone;
        await root.$axios.patch(`/api/todos/${todo.id}`, {
          isDone: todo.isDone,
        });
        getTodo();
      } catch (e) {
        console.log(e);
      }
    };

    // complete_todoをget
    const getCompleteTodo = async () => {
      try {
        const response = await root.$axios.get("/api/todos/complete");
        completeTodoList.value = { ...response.data.data };
      } catch (e) {
        console.log(e);
      }
    };

    return {
      todoItem,
      todoList,
      completeTodoList,
      addTodo,
      deleteTodo,
      updateTodo,
      completeTodo,
    };
  },
});
</script>

<template>
  <div class="container">
    <section class="todo-new">
      <h1>Add todos</h1>
      <input v-model="todoItem.title" type="text" placeholder="todoを記入" />
      <button @click="addTodo()">Todoを追加</button>
    </section>

    <section class="todo-index">
      <h1>Incomplete todos</h1>
      <ul>
        <li v-for="(todo, i) in todoList" :key="i">
          <input
            class="item"
            type="checkbox"
            :checked="todo.isDone"
            @change="completeTodo(todo)"
          />
          <input
            class="item"
            type="text"
            v-model="todo.title"
            @change="updateTodo(i, todo)"
          />
          <button @click="deleteTodo(todo.id)">削除する</button>
        </li>
      </ul>
    </section>

    <section class="todo-complete">
      <h1>Complete todos</h1>
      <ul>
        <li v-for="(todo, i) in completeTodoList" :key="i">
          <input
            class="item"
            type="checkbox"
            :checked="todo.isDone"
            @change="completeTodo(todo)"
          />
          {{ todo.title }}
          <button @click="deleteTodo(todo.id)">削除する</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
.container {
  margin: 80px auto;
  min-height: 100vh;
  text-align: center;
}

section {
  margin-bottom: 30px;
}

.item {
  font-size: 1rem;
  margin: 0 10x;
}

li {
  list-style: none;
  margin-bottom: 0.5em;
}
</style>
```

## 実際に動作させてみる

`docker-compose up` させて, `localhost:8000` にアクセスすると画面を確認できます。

# まとめ

Dockerfile を 1 から書いたのも初めてだったので良い勉強になりました。
Nuxt.js に関しては知らないことしかないので勉強していきます。
「ここのコードもっとこうした方がいいよ！」というのがあればぜひアドバイスお願いします。
