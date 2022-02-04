import { FeedItem } from "../../lib/rssParser";
import styles from "./TechPost.module.css";
import Image from "next/image";

type Props = {
  head: string;
  postList: FeedItem[];
};

const TechPost = ({ head, postList }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <Image
          src={`/${head}.svg`}
          alt={`${head} Logo`}
          width={20}
          height={20}
        />
        <h1 className={styles.service}>{head}</h1>
      </div>
      <div className={styles.articles}>
        {postList.map((post, index) => (
          <div className={styles.article} key={index}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <h4 className={`${styles.title} ${styles[head]}`}>
                {post.title}
              </h4>
            </a>
            <p className={styles.content}>{post.omittedContent}...</p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["button-link"]}
            >
              <button className={styles.button}>続きを読む</button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechPost;
