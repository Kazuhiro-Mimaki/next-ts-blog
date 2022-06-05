import Parser from "rss-parser";
import fs from "fs-extra";

const TECH_URL_HASH_MAP = {
  zenn: "https://zenn.dev/b1essk/feed",
};

// Zenn feed の型
// 他のモジュールで型指定をimportしようとするとエラーになる
interface IZennFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}

async function getZennFeeds(url: string) {
  const postList: IZennFeedPost[] = [];

  const parser = new Parser();
  const feed = await parser.parseURL(url);
  if (feed?.items.length === 0) return [];

  feed.items.map(({ title, link, isoDate, content }) => {
    const dateMiliSeconds = convertDateFormat(isoDate ?? "");
    if (title && link && isoDate && content) {
      const post: IZennFeedPost = {
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
function sortByDate(zennPosts: IZennFeedPost[]) {
  return [...zennPosts].sort(
    (a, b: IZennFeedPost) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

// Convert date format
const convertDateFormat = (isoDate: string): number => {
  return new Date(isoDate).getTime();
};

// Get zenn post list -> write in json file
(async function () {
  const zennPostList = await getZennFeeds(TECH_URL_HASH_MAP["zenn"]);
  fs.ensureDirSync("_tech/_zenn");
  fs.writeJsonSync("_tech/_zenn/posts.json", zennPostList);
})();
