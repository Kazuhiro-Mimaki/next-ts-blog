import styles from "./self-reflection.module.css";
import { PostComponent } from "../../../components/componentProvider";
import Post from "../../../types/post/post";
import { getPostList } from "../../../lib/parsePostList";

type Props = {
  postList: Post[];
};

const Index = ({ postList }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {postList.map((post, index) => (
          <PostComponent post={post} key={index} />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("_self-reflection", [
    "title",
    "date",
    "slug",
    "excerpt",
  ]);

  return {
    props: { postList },
  };
};

export default Index;
