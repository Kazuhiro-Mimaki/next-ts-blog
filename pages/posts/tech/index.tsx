import styles from "./tech.module.css";
import zennPostList from "../../../_tech/_zenn/posts.json";
import qiitaPostList from "../../../_tech/_qiita/posts.json";
import {
  LayoutComponent,
  TechPostComponent,
} from "../../../components/componentProvider";
import { FeedItem } from "../../../lib/rssParser";

type Props = {
  zennPostList: FeedItem[];
  qiitaPostList: FeedItem[];
};

const TechPost = ({ zennPostList, qiitaPostList }: Props) => {
  return (
    <LayoutComponent>
      <div className={styles.container}>
        <TechPostComponent head="Zenn" postList={zennPostList} />
        <TechPostComponent head="Qiita" postList={qiitaPostList} />
      </div>
    </LayoutComponent>
  );
};

export const getStaticProps = async () => {
  return {
    props: { zennPostList, qiitaPostList },
  };
};

export default TechPost;
