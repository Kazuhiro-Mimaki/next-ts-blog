import Parser from "rss-parser";
import fs from "fs-extra";

export interface IFeedItem {
  title: string;
  link: string;
  content: string;
  isoDate: string;
  dateMiliSeconds: number;
}

export class FeedItem {
  public title: string;
  public link: string;
  public content: string;
  public isoDate: string;
  public dateMiliSeconds: number;

  constructor(_feedItem: FeedItem) {
    this.title = _feedItem.title;
    this.link = _feedItem.link;
    this.content = _feedItem.content;
    this.isoDate = _feedItem.isoDate;
    this.dateMiliSeconds = _feedItem.dateMiliSeconds;
  }
}

export const techUrlList = [
  "https://qiita.com/Kazuhiro_Mimaki/feed",
  "https://zenn.dev/b1essk/feed",
];

const parser = new Parser();

async function getPostList(urlList: string[]) {
  const feedItemList: IFeedItem[] = [];
  for (const url of urlList) {
    const feed = await parser.parseURL(url);
    if (feed?.items.length === 0) return [];
    feed.items.map(({ title, link, content, isoDate }) => {
      const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
      if (title && link && content && isoDate) {
        const feedItem = new FeedItem({
          title,
          link,
          content,
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

(async function () {
  const postList = await getPostList(techUrlList);
  fs.ensureDirSync("_tech");
  fs.writeJsonSync("_tech/posts.json", postList);
})();
