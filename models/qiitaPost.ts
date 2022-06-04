export class QiitaPost {
  id: string;
  title: string;
  body: string;
  summary: string;
  tags: IQiitaAPITag[];
  url: string;
  private: boolean;
  likesCount: number;
  pageViews: number;
  createdAt: Date;

  constructor(_post: IQiitaAPIPost) {
    const START_INDEX = 0;
    const END_INDEX = 300;

    this.id = _post.id;
    this.title = _post.title;
    this.body = _post.body;
    this.summary = _post.body.substring(START_INDEX, END_INDEX);
    this.tags = _post.tags;
    this.url = _post.url;
    this.private = _post.private;
    this.likesCount = _post.likes_count;
    this.pageViews = _post.page_views_count;
    this.createdAt = _post.created_at;
  }
}

// Qiita API のレスポンス型

export interface IQiitaAPIPost {
  id: string;
  title: string;
  body: string;
  coediting: boolean;
  private: boolean;
  url: string;
  tags: IQiitaAPITag[];
  comments_count: number;
  likes_count: number;
  page_views_count: number;
  reactions_count: number;
  rendered_body: string;
  length: number;
  team_membership: null;
  user: IQiitaAPIUser;
  group: string;
  created_at: Date;
  updated_at: Date;
}

export interface IQiitaAPITag {
  name: string;
  versions: number[];
}

export interface IQiitaAPIUser {
  id: string;
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string;
  items_count: number;
  linkedin_id: string;
  location: string;
  name: string;
  organization: string;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string;
}
