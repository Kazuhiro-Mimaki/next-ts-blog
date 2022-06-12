import { IFeedPost } from "./rssParser";

export const formatDate = (isoDate: IFeedPost["isoDate"]) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
