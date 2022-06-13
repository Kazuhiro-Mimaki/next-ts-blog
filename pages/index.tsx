import style from "../styles/index.module.css";
import Image from "next/image";
import Link from "next/link";

const IndexPage = () => {
  return (
    <div className={style.container}>
      <main className={style.main}>
        <h1 className={style.name}>Kazuhiro Mimaki's Portfolio</h1>
        <div className={style["item-list"]}>
          <section className={style.item}>
            <Link href="/note">
              <a className={`${style.circle} ${style.note}`}>
                <Image
                  className={style.icon}
                  src="/svg/note.svg"
                  alt="note"
                  width={35}
                  height={35}
                />
              </a>
            </Link>
            <div>
              <h2>Note</h2>
              <p>日々のメモとか気づきとか</p>
            </div>
          </section>
          <section className={style.item}>
            <Link href="/tech">
              <a className={`${style.circle} ${style.tech}`}>
                <Image
                  className={style.icon}
                  src="/svg/develop.svg"
                  alt="develop"
                  width={35}
                  height={35}
                />
              </a>
            </Link>
            <div>
              <h2>Tech</h2>
              <p>技術関連</p>
            </div>
          </section>
          <section className={style.item}>
            <Link href="/reflection">
              <a className={`${style.circle} ${style.reflection}`}>
                <Image
                  className={style.icon}
                  src="/svg/reflection.svg"
                  alt="reflection"
                  width={35}
                  height={35}
                />
              </a>
            </Link>
            <div>
              <h2>Reflection</h2>
              <p>月次振り返り</p>
            </div>
          </section>
          <section className={style.item}>
            <Link href="/resume">
              <a className={`${style.circle} ${style.resume}`}>
                <Image
                  className={style.icon}
                  src="/svg/resume.svg"
                  alt="resume"
                  width={35}
                  height={35}
                />
              </a>
            </Link>
            <div>
              <h2>Resume</h2>
              <p>基本情報・経歴など</p>
            </div>
          </section>
          <section className={style.item}>
            <Link href="https://github.com/Kazuhiro-Mimaki">
              <a
                className={`${style.circle} ${style.github}`}
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
            </Link>
            <div>
              <h2>GitHub</h2>
              <p>GitHubリンク</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
