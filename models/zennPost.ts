export class ZennPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
  summary: string;

  constructor(_zennPost: IZennFeedPost) {
    this.title = _zennPost.title;
    this.link = _zennPost.link;
    this.isoDate = _zennPost.isoDate;
    this.dateMiliSeconds = _zennPost.dateMiliSeconds;
    this.content = _zennPost.content;
    this.summary = _zennPost.content.substring(0, 200);
  }
}

// Zenn RSS の型

export interface IZennFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}
