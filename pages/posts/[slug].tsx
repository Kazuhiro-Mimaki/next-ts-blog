import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getPostList } from "../../lib/newHelper";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import PostType from "../../types/post/post";

type Props = {
  post: PostType;
  preview?: boolean;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Next.js Blog Example with</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <p>{post.title}</p>
            <p>{post.coverImage}</p>
            <p>{post.date}</p>
            <p>{post.content}</p>
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
  console.log(params.slug);
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getPostList("_self-reflection/_2022", ["slug"]);

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
