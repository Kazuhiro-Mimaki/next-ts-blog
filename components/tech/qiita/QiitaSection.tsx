import { VFC } from "react";
import { QiitaPost } from "../../../models/qiitaPost";
import { IconComponent } from "../../componentProvider";
import style from "./QiitaSection.module.css";

type Props = {
  posts: QiitaPost[];
};

const QiitaSection: VFC<Props> = ({ posts }) => {
  return (
    <div className={style.posts}>
      {posts.map((post, index) => {
        return (
          !post.private && (
            <a
              className={style.post}
              href={post.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent name="qiita.com" />
              <p className={style["post-title"]}>{post.title}</p>
            </a>
          )
        );
      })}
    </div>
  );
};

export default QiitaSection;
