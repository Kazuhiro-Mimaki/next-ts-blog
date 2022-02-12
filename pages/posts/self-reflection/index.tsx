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
      sectionTitle="REFLECTION"
      sectionMemo="振り返り"
    />
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("/self-reflection", [
    "title",
    "date",
    "slug",
    "leading",
  ]);

  return {
    props: { postList },
  };
};

export default Index;
