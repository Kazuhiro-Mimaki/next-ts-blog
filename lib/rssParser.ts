import Parser from "rss-parser";
// import { FeedItem, IFeedItem } from "../types/feed-item/feedItem";

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

export const techUrlList = [
  "https://qiita.com/Kazuhiro_Mimaki/feed",
  "https://zenn.dev/b1essk/feed",
];

const parser = new Parser();

async function getFeedPosts(urlList: string[]) {
  const feedItemList: IFeedItem[] = [];
  for (const url of urlList) {
    const feed = await parser.parseURL(url);
    if (feed?.items.length === 0) return [];
    feed.items.map(({ title, link, isoDate }) => {
      const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
      if (title && link && isoDate) {
        const feedItem = new FeedItem({
          title,
          link,
          isoDate,
          dateMiliSeconds,
        });
        feedItemList.push(feedItem);
      }
    });
  }
  return sortItemList(feedItemList);
}

function sortItemList(feedItemList: IFeedItem[]) {
  const itemList = feedItemList;
  return itemList.sort(
    (a, b: IFeedItem) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

getFeedPosts(techUrlList);
