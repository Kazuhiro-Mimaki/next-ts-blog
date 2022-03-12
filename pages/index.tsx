import Post from "../types/post/post";
import notePosts from "../_tech/_note/posts.json";
import style from "../styles/index.module.css";

const Index = () => {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>Home</h1>
        <div className={style.main}>
          {filterdPostList(notePosts).map((note, index) => {
            return (
              <a className={style.card} href={note.link} key={index}>
                {note.title}
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
