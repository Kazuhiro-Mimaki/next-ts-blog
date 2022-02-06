import styles from "./Post.module.css";
import Link from "next/link";
import Post from "../../types/post/post";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <div className={styles.container}>
      <time className={`${styles.info} ${styles.left}`}>{post.date}</time>
      <div className={`${styles.info} ${styles.right}`}>
        <Link href={`/posts/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </div>
    </div>
  );
};

export default Post;
