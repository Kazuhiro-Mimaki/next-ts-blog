import style from "../styles/index.module.css";
import { NavHeadComponent } from "../components/componentProvider";
import Link from "next/link";

const IndexPage = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style["nav-head"]}>
          <NavHeadComponent title="All" sub="全ての記事" />
        </div>

        <div className={style["item-list"]}>
          <Link href="/note/1">
            <a className={style.item}>Note</a>
          </Link>
          <Link href="/tech">
            <a className={style.item}>Tech</a>
          </Link>
          <Link href="/reflection">
            <a className={style.item}>Reflection</a>
          </Link>
          <Link href="/resume">
            <a className={style.item}>Resume</a>
          </Link>
          <Link href="https://github.com/Kazuhiro-Mimaki">
            <a className={style.item} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
