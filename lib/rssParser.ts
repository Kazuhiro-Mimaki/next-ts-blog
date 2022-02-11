import Parser from "rss-parser";
import fs from "fs-extra";

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

const parser = new Parser();

async function getFeedItems(url: string) {
  let feedItemList: IFeedItem[] = [];
  const feed = await parser.parseURL(url);
  if (feed?.items.length === 0) return [];
  feed.items.map(({ title, link, content, isoDate }) => {
    const leading = content ? content.substring(0, 150) : "";
    const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
    if (title && link && content && isoDate) {
      const feedItem = new FeedItem({
        title,
        link,
        leading,
        isoDate,
        dateMiliSeconds,
      });
      feedItemList.push(feedItem);
    }
  });
  // if (url.includes(feedHashMap["note"])) {
  //   feedItemList = feedItemList.filter((item) => {
  //     return item.title.match(new RegExp(filterKeyword));
  //   });
  // }
  return sortItemList(feedItemList);
}

function sortItemList(feedItemList: IFeedItem[]) {
  const itemList = [...feedItemList];
  return itemList.sort(
    (a, b: IFeedItem) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

export const feedHashMap = {
  qiita: "https://qiita.com/Kazuhiro_Mimaki/feed",
  zenn: "https://zenn.dev/b1essk/feed",
};

async function writeJsonSync(serviceName: keyof typeof feedHashMap) {
  const postList = await getFeedItems(feedHashMap[serviceName]);
  fs.ensureDirSync(`_posts/feed/${serviceName}`);
  fs.writeJsonSync(`_posts/feed/${serviceName}/posts.json`, postList);
}

(async function () {
  writeJsonSync("zenn");
  writeJsonSync("qiita");
})();
