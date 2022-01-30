import styles from "./Post.module.css";
import Link from "next/link";
import Post from "../../types/post/post";

type Props = {
  post: Post;
};

const PostComponent = ({ post }: Props) => {
  return (
    <div className={styles.header}>
      <Link href={`/posts/${post.slug}`}>
        <a>{post.title}</a>
      </Link>
      <img src={post.thumbnail} />
      <p>{post.date}</p>
    </div>
  );
};

export default PostComponent;
