import { FooterComponent, HeaderComponent } from "../componentProvider";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>{children}</main>
      <FooterComponent />
    </>
  );
};

export default Layout;
