import styles from "./tech.module.css";
import zennPostList from "../../../_posts/feed/zenn/posts.json";
import qiitaPostList from "../../../_posts/feed/qiita/posts.json";
import { TechPostComponent } from "../../../components/componentProvider";
import { FeedItem } from "../../../types/feed-item/feedItem";

type Props = {
  zennPostList: FeedItem[];
  qiitaPostList: FeedItem[];
};

const TechPost = ({ zennPostList, qiitaPostList }: Props) => {
  return (
    <div className={styles.container}>
      <TechPostComponent head="Zenn" postList={zennPostList} />
      <TechPostComponent head="Qiita" postList={qiitaPostList} />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: { zennPostList, qiitaPostList },
  };
};

export default TechPost;
