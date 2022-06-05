import { GetStaticPaths, GetStaticProps } from "next";
import { VFC } from "react";
import {
  MarkdownComponent,
  NavHeadComponent,
} from "../../../components/componentProvider";
import { getAllPosts, getPostBySlug } from "../../../lib/parseAllPost";
import style from "../reflection.module.css";

type Props = {
  post: any;
};

const ReflectionPage: VFC<Props> = ({ post }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="Reflection" sub="月次振り返り" />
        </div>

        <MarkdownComponent content={post.content} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPosts().map((post) => `/reflection/${post.slug}`);
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (ctx): Promise<any> => {
  const currentPageSlug = ctx.params!.id as string;
  const post = getPostBySlug(currentPageSlug, [
    "title",
    "date",
    "slug",
    "content",
  ]);

  return {
    props: {
      post,
    },
  };
};

export default ReflectionPage;
