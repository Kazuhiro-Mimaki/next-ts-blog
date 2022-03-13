import zennPosts from "../../_tech/_zenn/posts.json";
import qiitaPosts from "../../_tech/_qiita/posts.json";
import style from "../../styles/index.module.css";

const Index = () => {
  const techPostList = [...zennPosts, ...qiitaPosts];
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
                    src={`http://www.google.com/s2/favicons?domain=${techLink(
                      post.link
                    )}`}
                    alt="post"
                    width={14}
                    height={14}
                  />
                  {techLink(post.link)}
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

const techLink = (link: string) => {
  switch (true) {
    case link.includes("zenn"):
      return "zenn.dev";
    case link.includes("qiita"):
      return "qiita.com";
    default:
      return "no link";
  }
};

export default Index;
