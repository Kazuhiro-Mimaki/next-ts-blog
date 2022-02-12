import styles from "./Post.module.css";
import Link from "next/link";
import Post from "../../types/post/post";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a className={styles.container}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.leading}>{post.leading}...</p>
      </a>
    </Link>
  );
};

export default Post;
