import { FeedItem } from "../../../types/feed-item/feedItem";
import styles from "./PostCard.module.css";
import { LogoComponent, LinkButtonComponent } from "../../componentProvider";

type Props = {
  head: string;
  post: FeedItem;
};

const PostCard = ({ head, post }: Props) => {
  return (
    <div className={styles.article}>
      <a href={post.link} target="_blank" rel="noopener noreferrer">
        <h3 className={`${styles.title} ${styles[head]}`}>{post.title}</h3>
      </a>
      <p className={styles.content}>{post.omittedContent}...</p>
      <div className={styles.right}>
        <LinkButtonComponent link={post.link} message={"続きを読む"} />
      </div>
    </div>
  );
};

export default PostCard;
