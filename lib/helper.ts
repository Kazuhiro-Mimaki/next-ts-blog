import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import glob from "glob";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export const getSlug = (fullPath: string) => {};

export function getPostBySlug(fullPath: string, fields: string[] = []) {
  const slugArray = fullPath.split("/");
  const slug = slugArray[slugArray.length - 1];
  const realSlug = slug.replace(/\.md$/, "");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  // 全ての記事を走査し、fullpathのリストを返す
  const posts = glob.sync(`${postsDirectory}/**/*.md`);
  // fullPathからslugを取得 => { slug: '2022-01-self-reflection' }
  return posts.map((post) => getPostBySlug(post, fields));
}

export function getTarget(realSlug: string, fields: string[] = []) {
  const fullPath = glob.sync(`${postsDirectory}/**/${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath[0], "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}
