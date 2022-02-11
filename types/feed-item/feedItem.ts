export interface IFeedItem {
  title: string;
  link: string;
  leading: string;
  isoDate: string;
  dateMiliSeconds: number;
}

export class FeedItem {
  public title: string;
  public link: string;
  public leading: string;
  public isoDate: string;
  public dateMiliSeconds: number;

  constructor(_feedItem: FeedItem) {
    this.title = _feedItem.title;
    this.link = _feedItem.link;
    this.leading = _feedItem.leading;
    this.isoDate = _feedItem.isoDate;
    this.dateMiliSeconds = _feedItem.dateMiliSeconds;
  }
}
