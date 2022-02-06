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
    </header>
  );
};

export default HeaderComponent;
