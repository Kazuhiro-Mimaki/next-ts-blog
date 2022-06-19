import style from "../styles/index.module.css";
import { NavHeadComponent } from "../components/componentProvider";

const IndexPage = () => {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <h1 className={style.name}>Portfolio</h1>
        <div className={style["item-list"]}>
          <NavHeadComponent
            title="Note"
            sub="日々のメモとか気づきとか"
            borderColor="#00fe9b"
            shadowColor="#02c435"
          />
          <NavHeadComponent
            title="Tech"
            sub="技術関連"
            borderColor="#ff5161"
            shadowColor="#d30302"
          />
          <NavHeadComponent
            title="Reflection"
            sub="月次振り返り"
            borderColor="#2dd9fe"
            shadowColor="#00a3d5"
          />
          <NavHeadComponent
            title="Resume"
            sub="基本情報・経歴など"
            borderColor="#ffdb4e"
            shadowColor="#b48505"
          />
          <NavHeadComponent
            title="Github"
            sub="GitHubリンク"
            borderColor="#fefefe"
            shadowColor="#ffffff"
          />
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
