import { PageComponent } from "../../../components/componentProvider";
import Post from "../../../types/post/post";
import { getPostList } from "../../../lib/parseMarkdown";

type Props = {
  postList: Post[];
};

const Index = ({ postList }: Props) => {
  return (
    <PageComponent
      postList={postList}
      sectionTitle="TECH"
      sectionMemo="技術関連"
    />
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("/tech", ["title", "date", "slug", "leading"]);

  return {
    props: { postList },
  };
};

export default Index;
