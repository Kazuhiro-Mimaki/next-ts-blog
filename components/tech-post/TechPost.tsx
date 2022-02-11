import { FeedItem } from "../../types/feed-item/feedItem";
import styles from "./TechPost.module.css";
import { LogoComponent, PostCardComponent } from "../componentProvider";

type Props = {
  head: string;
  postList: FeedItem[];
};

const TechPost = ({ head, postList }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <LogoComponent head={head} />
        <h1 className={styles.service}>{head}</h1>
      </div>

      <section className={styles.articles}>
        {postList.map((post, index) => (
          <PostCardComponent head={head} post={post} index={index} />
        ))}
      </section>
    </div>
  );
};

export default TechPost;
