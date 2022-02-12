import styles from "./Page.module.css";
import { PostComponent } from "../../../components/componentProvider";
import Post from "../../../types/post/post";

type Props = {
  postList: Post[];
  sectionTitle: string;
  sectionMemo: string;
};

const Page = ({ postList, sectionTitle, sectionMemo }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles["section-title"]}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <p className={styles.memo}>{sectionMemo}</p>
      </div>
      <main className={styles.main}>
        {postList.map((post, index) => (
          <PostComponent post={post} key={index} />
        ))}
      </main>
    </div>
  );
};

export default Page;
