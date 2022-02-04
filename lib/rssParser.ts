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

const parser = new Parser();

async function getFeedItems(url: string) {
  const feedItemList: IFeedItem[] = [];
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
  return sortItemList(feedItemList);
}

function sortItemList(feedItemList: IFeedItem[]) {
  const itemList = [...feedItemList];
  return itemList.sort(
    (a, b: IFeedItem) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

export const techUrlMap = {
  qiita: "https://qiita.com/Kazuhiro_Mimaki/feed",
  zenn: "https://zenn.dev/b1essk/feed",
};

(async function () {
  const zennPosts = await getFeedItems(techUrlMap["zenn"]);
  fs.ensureDirSync("_tech/_zenn");
  fs.writeJsonSync("_tech/_zenn/posts.json", zennPosts);

  const qiitaPosts = await getFeedItems(techUrlMap["qiita"]);
  fs.ensureDirSync("_tech/_qiita");
  fs.writeJsonSync("_tech/_qiita/posts.json", qiitaPosts);
})();
