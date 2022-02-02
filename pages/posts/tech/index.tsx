import styles from "./tech.module.css";
import TechPostType from "../../../types/post/techPost";
import techPosts from "../../../_tech/posts.json";

type Props = {
  techPostList: TechPostType[];
};

const TechPost = ({ techPostList }: Props) => {
  return (
    <div className={styles.container}>
      {techPostList.map((post, index) => (
        <div>
          {post.title}
          {post.link}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const techPostList = [...techPosts];

  return {
    props: { techPostList },
  };
};

export default TechPost;
