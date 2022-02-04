import { FeedItem } from "../../lib/rssParser";
import styles from "./TechPost.module.css";
import { Logo, LinkButton } from "../componentProvider";

type Props = {
  head: string;
  postList: FeedItem[];
};

const TechPost = ({ head, postList }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Logo head={head} />
        <h1 className={styles.service}>{head}</h1>
      </div>

      <section className={styles.articles}>
        {postList.map((post, index) => (
          <div className={styles.article} key={index}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <h4 className={`${styles.title} ${styles[head]}`}>
                {post.title}
              </h4>
            </a>
            <p className={styles.content}>{post.omittedContent}...</p>
            <div className={styles.right}>
              <LinkButton link={post.link} message={"続きを読む"} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TechPost;
