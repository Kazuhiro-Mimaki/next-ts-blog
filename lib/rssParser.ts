import Parser from "rss-parser";
import fs from "fs-extra";

const TECH_URL_HASH_MAP = {
  zenn: "https://zenn.dev/b1essk/feed",
};

// 他のモジュールで型指定をimportしようとするとエラーになる
export class ZennPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
  summary: string;

  constructor(_zennPost: IZennFeedPost) {
    this.title = _zennPost.title;
    this.link = _zennPost.link;
    this.isoDate = _zennPost.isoDate;
    this.dateMiliSeconds = _zennPost.dateMiliSeconds;
    this.content = _zennPost.content;
    this.summary = _zennPost.content.substring(0, 200);
  }
}

// Zenn RSS の型

export interface IZennFeedPost {
  title: string;
  link: string;
  isoDate: string;
  dateMiliSeconds: number;
  content: string;
}

async function getZennFeeds(url: string) {
  const postList: ZennPost[] = [];
  const parser = new Parser();
  const feed = await parser.parseURL(url);

  if (feed?.items.length === 0) return [];
  feed.items.map(({ title, link, isoDate, content }) => {
    const dateMiliSeconds = isoDate ? new Date(isoDate).getTime() : 0;
    if (title && link && isoDate && content) {
      const post = new ZennPost({
        title,
        link,
        isoDate,
        dateMiliSeconds,
        content,
      });
      postList.push(post);
    }
  });

  return sortByDate(postList);
}

// Sort post list
function sortByDate(zennPosts: ZennPost[]) {
  return [...zennPosts].sort(
    (a, b: ZennPost) => b.dateMiliSeconds - a.dateMiliSeconds
  );
}

// Get zenn post list -> write in json file
(async function () {
  const zennPostList = await getZennFeeds(TECH_URL_HASH_MAP["zenn"]);
  fs.ensureDirSync("_tech/_zenn");
  fs.writeJsonSync("_tech/_zenn/posts.json", zennPostList);
})();
