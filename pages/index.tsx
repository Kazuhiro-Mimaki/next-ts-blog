import style from "../styles/index.module.css";
import Image from "next/image";

const IndexPage = () => {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.name}>Kazuhiro Mimaki</h1>
        <div className={style["item-list"]}>
          <section className={style.item}>
            <a className={`${style.circle} ${style.note}`} href="/note">
              <Image
                className={style.icon}
                src="/svg/note.svg"
                alt="note"
                width={35}
                height={35}
              />
            </a>
            <div>
              <h2>Note</h2>
              <p>日々のメモとか気づきとか</p>
            </div>
          </section>
          <section className={style.item}>
            <a className={`${style.circle} ${style.tech}`} href="/tech">
              <Image
                className={style.icon}
                src="/svg/develop.svg"
                alt="develop"
                width={35}
                height={35}
              />
            </a>
            <div>
              <h2>Tech</h2>
              <p>技術関連</p>
            </div>
          </section>
          <section className={style.item}>
            <a
              className={`${style.circle} ${style.reflection}`}
              href="/reflection"
            >
              <Image
                className={style.icon}
                src="/svg/reflection.svg"
                alt="reflection"
                width={35}
                height={35}
              />
            </a>
            <div>
              <h2>Reflection</h2>
              <p>月次振り返り</p>
            </div>
          </section>
          <section className={style.item}>
            <a className={`${style.circle} ${style.resume}`} href="/resume">
              <Image
                className={style.icon}
                src="/svg/resume.svg"
                alt="resume"
                width={35}
                height={35}
              />
            </a>
            <div>
              <h2>Resume</h2>
              <p>基本情報・経歴など</p>
            </div>
          </section>
          <section className={style.item}>
            <a
              className={`${style.circle} ${style.github}`}
              href="https://github.com/Kazuhiro-Mimaki"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={style.icon}
                src="/svg/github.svg"
                alt="github"
                width={35}
                height={35}
              />
            </a>
            <div>
              <h2>GitHub</h2>
              <p>GitHubリンク</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
