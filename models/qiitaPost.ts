export class QiitaPost {
  id: string;
  title: string;
  body: string;
  tags: string[];
  url: string;
  private: boolean;
  likesCount: number;
  pageViews: number;
  createdAt: Date;

  constructor(_post: IQiitaPost) {
    this.id = _post.id;
    this.title = _post.title;
    this.body = _post.body;
    this.tags = _post.tags;
    this.url = _post.url;
    this.private = _post.private;
    this.likesCount = _post.likes_count;
    this.pageViews = _post.page_views_count;
    this.createdAt = _post.created_at;
  }
}

export interface IQiitaPost {
  id: string;
  title: string;
  body: string;
  tags: string[];
  url: string;
  private: boolean;
  likes_count: number;
  page_views_count: number;
  created_at: Date;
}
