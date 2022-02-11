import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import glob from "glob";

export const getSlug = (fullPath: string) => {
  const slugList = fullPath.split("/");
  const realSlug = slugList[slugList.length - 1].replace(/\.md$/, "");
  return realSlug;
};

export const getLeading = (content: string) => {
  return content.substring(0, 150);
};

export const getPost = (slug: string, fields: string[] = []) => {
  const fileContents = fs.readFileSync(slug, "utf-8");
  const { data, content } = matter(fileContents);
  type Items = {
    [key: string]: string;
  };
  const items: Items = {};
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = getSlug(slug);
    }
    if (field === "leading") {
      items[field] = getLeading(content);
    }
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
  const postsDirectory = join(process.cwd(), `_posts${targetDirectory}`);
  const files = glob.sync(`${postsDirectory}/**/*.md`);
  const posts = [...files]
    .map((file) => getPost(file, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
