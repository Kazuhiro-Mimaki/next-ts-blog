import styles from "./tech.module.css";
import TechPostType from "../../../types/post/techPost";
import zennPostList from "../../../_tech/_zenn/posts.json";
import qiitaPostList from "../../../_tech/_qiita/posts.json";

type Props = {
  zennPostList: TechPostType[];
  qiitaPostList: TechPostType[];
};

const TechPost = ({ zennPostList, qiitaPostList }: Props) => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1>Zenn</h1>
        {zennPostList.map((post, index) => (
          <div className={`${styles.article} ${styles.zenn}`}>
            <a href={post.link} key={index} className={styles.title}>
              {post.title}
            </a>
            <p className={styles.content}>{post.content}</p>
          </div>
        ))}
      </section>
      <section className={styles.section}>
        <h1>Qiita</h1>
        {qiitaPostList.map((post, index) => (
          <div className={`${styles.article} ${styles.qiita}`}>
            <a href={post.link} key={index} className={styles.title}>
              {post.title}
            </a>
            <p className={styles.content}>{post.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: { zennPostList, qiitaPostList },
  };
};

export default TechPost;
