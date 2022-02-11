import styles from "./tech.module.css";
import { TechPostComponent } from "../../../components/componentProvider";
import zennPostList from "../../../_posts/feed/zenn/posts.json";
import qiitaPostList from "../../../_posts/feed/qiita/posts.json";
import { FeedItem } from "../../../types/feed-item/feedItem";
import { shuffle } from "../../../lib/helper";

type Props = {
  postList: FeedItem[];
};

const Index = ({ postList }: Props) => {
  const shuffledPostList = shuffle([...postList]);

  return (
    <div className={styles.container}>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>TECH</h2>
        <p className={styles.memo}>技術関連</p>
      </div>
      <main className={styles.main}>
        {shuffledPostList.map((post, index) => (
          <TechPostComponent post={post} key={index} />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const postList = [...zennPostList, ...qiitaPostList];
  return {
    props: { postList },
  };
};

export default Index;
