import { VFC } from "react";
import { formatDate } from "../../../lib/utils";
import { ZennPost } from "../../../models/zennPost";
import { IconComponent } from "../../componentProvider";
import style from "./ZennSection.module.css";

type Props = {
  posts: ZennPost[];
};

const ZennSection: VFC<Props> = ({ posts }) => {
  return (
    <div className={style.posts}>
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
            {/* {formatDate(post.isoDate)} */}
          </a>
        );
      })}
    </div>
  );
};

export default ZennSection;
