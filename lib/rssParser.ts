import Parser from "rss-parser";
import fs from "fs-extra";
import { FeedItem, IFeedItem } from "../types/feed-item/feedItem";

const parser = new Parser();
const filterKeyword = "Monthly Reports";

async function getFeedItems(url: string) {
  let feedItemList: IFeedItem[] = [];
  const feed = await parser.parseURL(url);
  if (feed?.items.length === 0) return [];
  feed.items.map(({ title, link, content, isoDate }) => {
    const omittedContent = content ? content.substring(0, 200) : "";
    const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
    if (title && link && content && isoDate) {
      const feedItem = new FeedItem({
        title,
        link,
        omittedContent,
        isoDate,
        dateMiliSeconds,
      });
      feedItemList.push(feedItem);
    }
  });
  if (url.includes(feedHashMap["note"])) {
    feedItemList = feedItemList.filter((item) => {
      return item.title.match(new RegExp(filterKeyword));
    });
  }
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
  note: "https://note.com/b1essk/rss",
};

async function writeJsonSync(serviceName: keyof typeof feedHashMap) {
  const postList = await getFeedItems(feedHashMap[serviceName]);
  fs.ensureDirSync(`_feed/${serviceName}`);
  fs.writeJsonSync(`_feed/${serviceName}/posts.json`, postList);
}

(async function () {
  writeJsonSync("zenn");
  writeJsonSync("qiita");
  writeJsonSync("note");
})();
