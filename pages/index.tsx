import Head from "next/head";
import { PageComponent } from "../components/componentProvider";
import Post from "../types/post/post";
import { getPostList } from "../lib/parseMarkdown";

type Props = {
  postList: Post[];
};

const Index = ({ postList }: Props) => {
  return (
    <>
      <PageComponent
        postList={postList}
        sectionTitle="ALL"
        sectionMemo="記事一覧"
      />
    </>
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("", ["title", "date", "slug", "leading"]);

  return {
    props: { postList },
  };
};

export default Index;
