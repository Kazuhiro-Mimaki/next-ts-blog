export class ZennPost {
  public title: string;
  public link: string;
  public isoDate: string;
  public dateMiliSeconds: number;
  public summary: string;

  constructor(_zennPost: ZennPost) {
    this.title = _zennPost.title;
    this.link = _zennPost.link;
    this.isoDate = _zennPost.isoDate;
    this.dateMiliSeconds = _zennPost.dateMiliSeconds;
    this.summary = _zennPost.summary;
  }
}

export interface IZennPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  summary: string;
}
