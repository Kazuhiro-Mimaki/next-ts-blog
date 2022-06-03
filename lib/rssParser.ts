import Parser from "rss-parser";
import fs from "fs-extra";

export interface IFeedItem {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  summary: string;
}

export class FeedItem {
  public title: string;
  public link: string;
  public isoDate: string;
  public dateMiliSeconds: number;
  public summary: string;

  constructor(_feedItem: IFeedItem) {
    this.title = _feedItem.title;
    this.link = _feedItem.link;
    this.isoDate = _feedItem.isoDate;
    this.dateMiliSeconds = _feedItem.dateMiliSeconds;
    this.summary = _feedItem.summary;
  }
}

const TECH_URL_HASH_MAP = {
  zenn: "https://zenn.dev/b1essk/feed",
};

async function getFeedPostList(url: string) {
  const postList: IFeedItem[] = [];
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  console.log(feed);
  if (feed?.items.length === 0) return [];
  feed.items.map(({ title, link, isoDate, contentSnippet }) => {
    const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
    const summary = contentSnippet?.substring(0, 200) || "";
    if (title && link && isoDate) {
      const post = new FeedItem({
        title,
        link,
        isoDate,
        dateMiliSeconds,
        summary,
      });
      postList.push(post);
    }
  });
  return sortItemList(postList);
}

// Sort post list
function sortItemList(feedItemList: IFeedItem[]) {
  const itemList = [...feedItemList];
  return itemList.sort(
    (a, b: IFeedItem) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

// Get zenn post list
(async function () {
  const zennPostList = await getFeedPostList(TECH_URL_HASH_MAP["zenn"]);
  fs.ensureDirSync("_tech/_zenn");
  fs.writeJsonSync("_tech/_zenn/posts.json", zennPostList);
})();
