import styles from "../life/life.module.css";
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
        <h2 className={styles.title}>SELF-REFLECTION</h2>
        <p className={styles.memo}>毎月の振り返り</p>
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
  const postList = getPostList("/self-reflection", [
    "title",
    "date",
    "slug",
    "leading",
  ]);

  return {
    props: { postList },
  };
};

export default Index;
