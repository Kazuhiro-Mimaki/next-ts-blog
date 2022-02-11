import styles from "./LifePost.module.css";
import Link from "next/link";
import Post from "../../types/post/post";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <Link href={`/posts/${post.slug}`}>
        <h3 className={styles.title}>{post.title}</h3>
      </Link>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </div>
  );
};

export default Post;
