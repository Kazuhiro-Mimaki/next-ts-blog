import Parser from "rss-parser";
import fs from "fs-extra";

const TECH_URL_HASH_MAP = {
  zenn: "https://zenn.dev/b1essk/feed",
  note: "https://note.com/b1essk/rss",
};

// Feed post の型
// 他のモジュールで型指定をimportしようとするとエラーになる
interface IFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}

async function getFeedPosts(url: string) {
  const postList: IFeedPost[] = [];

  const parser = new Parser();
  const feed = await parser.parseURL(url);
  console.log(feed.items);
  if (feed?.items.length === 0) return [];

  feed.items.map(({ title, link, isoDate, content }) => {
    const dateMiliSeconds = convertDateFormat(isoDate ?? "");
    if (title && link && isoDate && content) {
      const post: IFeedPost = {
        title: title,
        link: link,
        isoDate: isoDate,
        dateMiliSeconds: dateMiliSeconds,
        content: content,
      };
      postList.push(post);
    }
  });

  return sortByDate(postList);
}

// Sort post list
function sortByDate(feedPosts: IFeedPost[]) {
  return [...feedPosts].sort(
    (a, b: IFeedPost) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

// Convert date format
const convertDateFormat = (isoDate: string): number => {
  return new Date(isoDate).getTime();
};

// Get zenn post list -> write in json file
(async function () {
  const zennPostList = await getFeedPosts(TECH_URL_HASH_MAP["zenn"]);
  fs.ensureDirSync("_feed/_zenn");
  fs.writeJsonSync("_feed/_zenn/posts.json", zennPostList);
})();

// Get note post list -> write in json file
(async function () {
  const notePostList = await getFeedPosts(TECH_URL_HASH_MAP["note"]);
  fs.ensureDirSync("_feed/_note");
  fs.writeJsonSync("_feed/_note/posts.json", notePostList);
})();
