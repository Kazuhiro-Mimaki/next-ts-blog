import Post from "../../types/post/post";
import zennPosts from "../../_tech/_zenn/posts.json";
import style from "./reflection.module.css";

const Index = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <h2 className={style.title}>Reflection</h2>
          <p className={style.memo}>月次振り返り</p>
        </div>
        <div className={style.main}>
          {filterdPostList(zennPosts).map((post, index) => {
            return (
              <a
                className={style.card}
                href={post.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={style["post-title"]}>{post.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

const filterdPostList = (postList: Post[]) => {
  return postList.filter((post) => post.title.includes("Monthly"));
};

export default Index;
