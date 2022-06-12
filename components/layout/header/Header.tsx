import styles from "./Header.module.css";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.title}>b1essk.com</a>
      </Link>

      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.item}>All</a>
        </Link>
        <Link href="/note">
          <a className={styles.item}>Note</a>
        </Link>
        <Link href="/tech">
          <a className={styles.item}>Tech</a>
        </Link>
        <Link href="/reflection">
          <a className={styles.item}>Reflection</a>
        </Link>
        <Link href="/resume">
          <a className={styles.item}>Resume</a>
        </Link>
        <Link href="https://github.com/Kazuhiro-Mimaki">
          <a className={styles.item} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;
