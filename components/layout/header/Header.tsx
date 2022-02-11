import styles from "./Header.module.css";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <Link href="/posts/tech">
        <a className={styles.item}>Tech</a>
      </Link>
      <Link href="/posts/life">
        <a className={styles.item}>Life</a>
      </Link>
      <Link href="/posts/self-reflection">
        <a className={styles.item}>Self-Reflection</a>
      </Link>
      <Link href="https://github.com/Kazuhiro-Mimaki">
        <a className={styles.item} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Link>
    </header>
  );
};

export default HeaderComponent;
