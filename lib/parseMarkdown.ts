import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import glob from "glob";

const postsDirectory = join(process.cwd(), "_posts");

export const getSlug = (fullPath: string): string => {
  const slugList = fullPath.split("/");
  const slug = slugList[slugList.length - 1].replace(/\.md$/, "");
  return slug;
};

export const getLeading = (content: string): string => {
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

type Item = {
  slug: string | null;
  title: string | null;
};

export const getReflectionPosts = (fields: string[] = []) => {
  const fullPathList = glob.sync(`${postsDirectory}/reflection/**/*.md`);
  const items: Item[] = [];
  fullPathList.map(async (fullPath) => {
    const slug = getSlug(fullPath);
    const fileContents = await fs.readFileSync(slug, "utf-8");
    const { content } = matter(fileContents);

    const item: Item = { slug: null, title: null };
    fields.forEach((field) => {
      if (field === "slug") {
        item[field] = slug;
      }
      if (field === "title") {
        item[field] = getLeading(content);
      }
    });
    items.push(item);
  });

  return items;
};
