import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LayoutComponent } from "../components/componentProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>b1essk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;600;700&display=swap"
        />
      </Head>

      <div>
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
      </div>
    </>
  );
}

export default MyApp;
