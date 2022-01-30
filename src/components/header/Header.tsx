import type { NextComponentType } from "next";
import styles from "./Header.module.css";
import Link from "next/link";

const Header: NextComponentType = () => {
  return (
    <header className={styles.header}>
      <Link href="/tech">
        <a className={styles.item}>Tech</a>
      </Link>
      <Link href="/life">
        <a className={styles.item}>Life</a>
      </Link>
      <Link href="/look-back">
        <a className={styles.item}>Look-Back</a>
      </Link>
    </header>
  );
};

export default Header;
