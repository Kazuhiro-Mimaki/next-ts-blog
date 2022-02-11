import styles from "./life.module.css";
import { PostComponent } from "../../../components/componentProvider";
import Post from "../../../types/post/post";
import { getPostList } from "../../../lib/parseMarkdown";

type Props = {
  postList: Post[];
};

const Index = ({ postList }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>ライフ</h2>
        <p className={styles.memo}>日々のメモとか気づきとか</p>
      </div>
      <main className={styles.main}>
        {postList.map((post, index) => (
          <PostComponent post={post} key={index} />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("/life", ["title", "date", "slug", "leading"]);

  return {
    props: { postList },
  };
};

export default Index;
