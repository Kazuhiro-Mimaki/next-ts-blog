import zennPosts from "../_tech/_zenn/posts.json";
import style from "../styles/index.module.css";
import { NavHeadComponent } from "../components/componentProvider";

const Index = () => {
  const techPostList = [...zennPosts];
  techPostList.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);

  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <NavHeadComponent title="All" sub="全ての記事" />
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
                    alt="note"
                    width={14}
                    height={14}
                  />
                  {techLink(post.link)}
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
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
    case link.includes("note"):
      return "note.com";
    case link.includes("zenn"):
      return "zenn.dev";
    case link.includes("qiita"):
      return "qiita.com";
    default:
      return "no link";
  }
};

export default Index;
