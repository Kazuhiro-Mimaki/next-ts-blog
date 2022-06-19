import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
