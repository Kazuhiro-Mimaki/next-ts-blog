import styles from "./tech.module.css";
import TechPostType from "../../../types/post/techPost";
import techPosts from "../../../_tech/posts.json";

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
            <div className={styles.content}>{post.content}</div>
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
            <div className={styles.content}>{post.content}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const techPostList = [...techPosts];

  const zennPostList = techPostList.filter((techPost) =>
    techPost.link.includes("zenn.dev")
  );
  const qiitaPostList = techPostList.filter((techPost) =>
    techPost.link.includes("qiita.com")
  );

  return {
    props: { zennPostList, qiitaPostList },
  };
};

export default TechPost;
