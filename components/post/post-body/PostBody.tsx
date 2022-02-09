import styles from "./PostBody.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default PostBody;
