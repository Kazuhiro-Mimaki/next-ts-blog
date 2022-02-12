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
      sectionTitle="LIFE"
      sectionMemo="日々のメモとか気づきとか"
    />
  );
};

export const getStaticProps = async () => {
  const postList = getPostList("/life", ["title", "date", "slug", "leading"]);

  return {
    props: { postList },
  };
};

export default Index;
