import zennFeeds from "../../_tech/_zenn/posts.json";
import style from "../../styles/index.module.css";
import { GetStaticProps } from "next";
import axios, { AxiosResponse } from "axios";
import { IQiitaAPIPost, QiitaPost } from "../../models/qiitaPost";
import {
  NavHeadComponent,
  QiitaSectionComponent,
} from "../../components/componentProvider";
import { ZennPost } from "../../models/zennPost";
import { VFC } from "react";

type Props = {
  qiitaApiPosts: IQiitaAPIPost[];
  zennPosts: ZennPost[];
};

const TechPage: VFC<Props> = ({ qiitaApiPosts, zennPosts }) => {
  const qiitaPosts = qiitaApiPosts.map((post) => new QiitaPost(post));
  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent title="Tech" sub="技術関連" />
        </div>

        <QiitaSectionComponent posts={qiitaPosts} />
        {zennPosts.map((post, index) => {
          return <div key={index}>{post.title}</div>;
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const PAGE_NUMBER = 1;
  const PER_PAGE = 50;
  const res: AxiosResponse<IQiitaAPIPost[], IQiitaAPIPost[]> = await axios.get(
    `https://qiita.com/api/v2/authenticated_user/items?page=${PAGE_NUMBER}&per_page=${PER_PAGE}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    }
  );
  const qiitaApiPosts = res.data;
  const zennPosts = [...zennFeeds];

  return {
    props: {
      qiitaApiPosts,
      zennPosts,
    },
  };
};

export default TechPage;
