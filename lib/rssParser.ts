import Parser from "rss-parser";
import fs from "fs-extra";

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

  constructor(_feedItem: IFeedItem) {
    this.title = _feedItem.title;
    this.link = _feedItem.link;
    this.isoDate = _feedItem.isoDate;
    this.dateMiliSeconds = _feedItem.dateMiliSeconds;
  }
}

const TECH_URL_HASH_MAP = {
  zenn: "https://zenn.dev/b1essk/feed",
  qiita: "https://qiita.com/Kazuhiro_Mimaki/feed",
  note: "https://note.com/b1essk/rss",
};

async function getFeedPostList(url: string) {
  const postList: IFeedItem[] = [];
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  if (feed?.items.length === 0) return [];
  feed.items.map(({ title, link, isoDate }) => {
    const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
    if (title && link && isoDate) {
      const post = new FeedItem({
        title,
        link,
        isoDate,
        dateMiliSeconds,
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

// Get qiita post list
(async function () {
  const qiitaPostList = await getFeedPostList(TECH_URL_HASH_MAP["qiita"]);
  fs.ensureDirSync("_tech/_qiita");
  fs.writeJsonSync("_tech/_qiita/posts.json", qiitaPostList);
})();

// Get zenn post list
(async function () {
  const zennPostList = await getFeedPostList(TECH_URL_HASH_MAP["zenn"]);
  fs.ensureDirSync("_tech/_zenn");
  fs.writeJsonSync("_tech/_zenn/posts.json", zennPostList);
})();

// Get note post list
(async function () {
  const notePostList = await getFeedPostList(TECH_URL_HASH_MAP["note"]);
  fs.ensureDirSync("_tech/_note");
  fs.writeJsonSync("_tech/_note/posts.json", notePostList);
})();
