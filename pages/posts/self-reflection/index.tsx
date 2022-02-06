import styles from "./self-reflection.module.css";
import { PostComponent } from "../../../components/componentProvider";
import Post from "../../../types/post/post";
import { getPostList } from "../../../lib/helper";

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
  const postList = getPostList([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { postList },
  };
};

export default Index;
