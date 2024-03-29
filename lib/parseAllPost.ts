import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import glob from "glob";

const postsDirectory = join(process.cwd(), "_posts");

export const getSlug = (fullPath: string) => {
  const slugList = fullPath.split("/");
  const slug = slugList[slugList.length - 1].replace(/\.md$/, "");
  return { slug: slug };
};

export function getAllPosts() {
  const fullPathList = glob.sync(`${postsDirectory}/reflection/**/*.md`);
  return fullPathList.map((fullPath) => getSlug(fullPath));
}

export type Items = {
  [key: string]: string;
};

export function getPostBySlug(realSlug: string, fields: string[] = []) {
  const fullPath = glob.sync(`${postsDirectory}/**/${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath[0], "utf8");
  const { data, content } = matter(fileContents);

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = `reflection/${realSlug}`;
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
