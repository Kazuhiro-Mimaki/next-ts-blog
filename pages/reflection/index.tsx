import { GetStaticProps } from "next";
import { VFC } from "react";
import { NavHeadComponent } from "../../components/componentProvider";
import { getAllPosts, getPostBySlug } from "../../lib/parseAllPost";
import style from "./reflection.module.css";

type Post = {
  title: string;
  date: string;
  slug: string;
  content: string;
};

type Props = {
  posts: Post[];
};

const ReflectionPage: VFC<Props> = ({ posts }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="Reflection" sub="月次振り返り" />
        </div>

        <div className={style.posts}>
          {posts.map((post, index) => {
            return (
              <a className={style.post} href={`/${post.slug}`} key={index}>
                <p className={style.title}>{post.title}</p>
                <p>{post.content.substring(0, 100)}...</p>
              </a>
            );
          })}
        </div>
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
