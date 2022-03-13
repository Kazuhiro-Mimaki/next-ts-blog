import Post from "../types/post/post";
import notePosts from "../_tech/_note/posts.json";
import style from "../styles/index.module.css";

const Index = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style["section-title"]}>
          <h2 className={style.title}>All</h2>
          <p className={style.memo}>全ての記事</p>
        </div>
        <div className={style.main}>
          {filterdPostList(notePosts).map((note, index) => {
            return (
              <a
                className={style.card}
                href={note.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={style.icon}>
                  <img
                    src="http://www.google.com/s2/favicons?domain=note.com"
                    alt="note"
                    width={14}
                    height={14}
                  />
                  note.com
                </div>
                <p className={style["post-title"]}>{note.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

const filterdPostList = (postList: Post[]) => {
  return postList.filter((post) => !post.title.includes("Monthly"));
};

export default Index;
