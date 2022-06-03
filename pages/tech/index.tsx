import zennPosts from "../../_tech/_zenn/posts.json";
import style from "../../styles/index.module.css";
import { GetStaticProps } from "next";
import axios, { AxiosResponse } from "axios";
import { QiitaPost } from "../../models/qiitaPost";
import {
  IconComponent,
  NavHeadComponent,
} from "../../components/componentProvider";
import { ZennPost } from "../../models/zennPost";

type Props = {
  posts: QiitaPost[];
};

const summarize = (text: string): string => {
  const START_INDEX = 0;
  const END_INDEX = 300;
  return text.substring(START_INDEX, END_INDEX);
};

const excludePrivate = (posts: QiitaPost[]): QiitaPost[] => {
  return posts.filter((post) => !post.private);
};

const TechPage = ({ posts }: Props) => {
  const publicPosts = excludePrivate(posts);

  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent title="Tech" sub="技術関連" />
        </div>

        {publicPosts.map((post, index) => {
          return (
            <a
              className={style.post}
              href={post.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent name="qiita.com" />
              <p className={style["post-title"]}>{post.title}</p>
              <p>{summarize(post.body)}...</p>
            </a>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const PAGE_NUMBER = 1;
  const PER_PAGE = 50;
  const res: AxiosResponse<any> = await axios.get(
    `https://qiita.com/api/v2/authenticated_user/items?page=${PAGE_NUMBER}&per_page=${PER_PAGE}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    }
  );
  const posts = res.data;

  return {
    props: {
      posts,
    },
  };
};

export default TechPage;
