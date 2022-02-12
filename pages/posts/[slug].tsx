import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug } from "../../lib/parseAllPost";
import Head from "next/head";
import PostType from "../../types/post/post";
import { PostBodyComponent } from "../../components/componentProvider";
import styles from "./slug.module.css";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <article className={styles.container}>
            <Head>
              <title>{post.title} | Next.js Blog Example</title>
            </Head>

            <h1 className={styles.title}>{post.title}</h1>
            <PostBodyComponent content={post.content} />
          </article>
        </>
      )}
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
