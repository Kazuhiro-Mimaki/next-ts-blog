import { GetStaticProps } from "next";
import { VFC } from "react";
import { NavHeadComponent } from "../../components/componentProvider";
import { getAllPosts, getPostBySlug } from "../../lib/parseAllPost";
import style from "./reflection.module.css";

type Props = {
  posts: any[];
};

const ReflectionPage: VFC<Props> = ({ posts }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="Reflection" sub="月次振り返り" />
        </div>

        {posts.map((post, index) => {
          return (
            <a className={style.card} href={`/${post.slug}`} key={index}>
              {post.title}
            </a>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<any> => {
  const posts = getAllPosts().map((post) =>
    getPostBySlug(post.slug, ["title", "date", "slug", "content"])
  );

  return {
    props: {
      posts,
    },
  };
};

export default ReflectionPage;
