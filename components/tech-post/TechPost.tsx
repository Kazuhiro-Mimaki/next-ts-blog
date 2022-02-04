import { FeedItem } from "../../lib/rssParser";
import styles from "./TechPost.module.css";

type Props = {
  head: string;
  postList: FeedItem[];
};

const TechPost = ({ head, postList }: Props) => {
  return (
    <section className={styles.container}>
      <h1>{head}</h1>
      <div className={styles.articles}>
        {postList.map((post, index) => (
          <a href={post.link} key={index} className={styles.article}>
            <h4 className={`${styles.title} ${styles[head]}`}>{post.title}</h4>
            <p className={styles.content}>{post.omittedContent}...</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TechPost;
