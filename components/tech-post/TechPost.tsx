import { FeedItem } from "../../types/feed-item/feedItem";
import styles from "./TechPost.module.css";
import { LinkButtonComponent } from "../componentProvider";

type Props = {
  post: FeedItem;
};

const TechPost = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <a href={post.link} target="_blank" rel="noopener noreferrer">
        <h3 className={`${styles.title}`}>{post.title}</h3>
      </a>

      <p className={styles.leading}>{post.leading}...</p>
      <div className={styles.right}>
        <LinkButtonComponent link={post.link} message={"続きを読む"} />
      </div>
    </div>
  );
};

export default TechPost;
