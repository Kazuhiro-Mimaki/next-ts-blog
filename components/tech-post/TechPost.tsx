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
          <div className={styles.article}>
            <a href={post.link} key={index} className={styles.title}>
              {post.title}
            </a>
            <p className={styles.content}>{post.omittedContent}...</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechPost;
