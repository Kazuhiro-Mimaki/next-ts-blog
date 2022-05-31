import zennPosts from "../../_tech/_zenn/posts.json";
import qiitaPosts from "../../_tech/_qiita/posts.json";
import style from "../../styles/index.module.css";
import { GetStaticProps } from "next";
import axios, { AxiosResponse } from "axios";

type Props = {
  posts: any[];
};

const TechPage = ({ posts }: Props) => {
  console.log(posts);
  const techPostList = [...qiitaPosts];
  techPostList.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);

  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <h2 className={style.title}>Tech</h2>
          <p className={style.memo}>技術関連</p>
        </div>
        <div className={style.main}>
          {techPostList.map((post, index) => {
            return (
              <a
                className={style.card}
                href={post.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={style.icon}>
                  <img
                    src={`http://www.google.com/s2/favicons?domain=${post.link}`}
                    alt="post"
                    width={14}
                    height={14}
                  />
                  {post.link}
                </div>
                <p className={style["post-title"]}>{post.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: Props;
}> => {
  const res: AxiosResponse<any> = await axios.get("https://api/v2/items", {
    headers: {
      Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
    },
  });
  const { posts } = res.data;

  return {
    props: {
      posts,
    },
  };
};

export default TechPage;
