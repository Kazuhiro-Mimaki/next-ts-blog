import { GetStaticPaths, GetStaticProps } from "next";
import { VFC } from "react";
import {
  MarkdownComponent,
  NavHeadComponent,
} from "../../../components/componentProvider";
import { getAllPosts, getPostBySlug, Items } from "../../../lib/parseAllPost";
import style from "../reflection.module.css";

type Props = {
  post: Items;
};

const ReflectionPage: VFC<Props> = ({ post }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent
            title="Reflection"
            sub="月次振り返り"
            borderColor="#2dd9fe"
            shadowColor="#00a3d5"
          />
        </div>

        <MarkdownComponent content={post ? post.content : ""} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPosts().map((post) => `/reflection/${post.slug}`);
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = (ctx) => {
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
