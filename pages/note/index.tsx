import style from "../../styles/note-index.module.css";
import {
  IconComponent,
  NavHeadComponent,
} from "../../components/componentProvider";
import { GetStaticProps } from "next";
import { INoteFeedPost } from "../../models/notePost";
import { VFC } from "react";
import noteFeedPosts from "../../_feed/_note/posts.json";

type Props = {
  noteFeedPosts: INoteFeedPost[];
};

const NotePage: VFC<Props> = ({ noteFeedPosts }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent title="Note" sub="日々のメモとか気づきとか" />
        </div>

        <div className={style.posts}>
          {noteFeedPosts.map((content, index) => {
            return (
              <a
                className={style.post}
                href={content.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent name="note.com" />
                <p className={style["post-title"]}>{content.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      noteFeedPosts,
    },
  };
};

export default NotePage;
