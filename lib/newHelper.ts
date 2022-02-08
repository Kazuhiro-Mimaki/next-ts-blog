import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import glob from "glob";

const getFiles = (src: string) => {
  return glob.sync(`${src}/**/*.md`);
};

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const fileContents = fs.readFileSync(slug, "utf-8");
  const { data, content } = matter(fileContents);
  type Items = {
    [key: string]: string;
  };
  const items: Items = {};
  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  return items;
};

export const getPostList = (targetDirectory: string, fields: string[] = []) => {
  const postsDirectory = join(process.cwd(), `_posts/${targetDirectory}`);
  const files = getFiles(postsDirectory);
  const posts = [...files]
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
