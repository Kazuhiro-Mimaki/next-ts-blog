import { VFC } from "react";
import { ZennPost } from "../../../models/zennPost";
import { IconComponent } from "../../componentProvider";
import style from "./ZennSection.module.css";

type Props = {
  posts: ZennPost[];
};

const ZennSection: VFC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => {
        return (
          <a
            className={style.post}
            href={post.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent name="zenn.dev" />
            <p className={style["post-title"]}>{post.title}</p>
            <p>{post.summary}...</p>
          </a>
        );
      })}
    </>
  );
};

export default ZennSection;
