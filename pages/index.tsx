import Head from "next/head";
import styles from "../styles/Home.module.css";
import { PostComponent } from "../components/componentProvider";
import Post from "../types/post/post";
import { getPostList } from "../lib/helper";

type Props = {
  postList: Post[];
};

const Index = ({ postList }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Typescript Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {postList.map((post: Post, index: number) => (
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
