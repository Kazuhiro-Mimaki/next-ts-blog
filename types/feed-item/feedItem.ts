export interface IFeedItem {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
}

export class FeedItem {
  public title: string;
  public link: string;
  public isoDate: string;
  public dateMiliSeconds: number;

  constructor(_feedItem: FeedItem) {
    this.title = _feedItem.title;
    this.link = _feedItem.link;
    this.isoDate = _feedItem.isoDate;
    this.dateMiliSeconds = _feedItem.dateMiliSeconds;
  }
}
