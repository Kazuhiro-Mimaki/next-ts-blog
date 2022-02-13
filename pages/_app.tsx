import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  FooterComponent,
  HeaderComponent,
  LayoutComponent,
} from "../components/componentProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mimaki Kazuhiro Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className="wrap">
        <HeaderComponent />
        <LayoutComponent>
          <Component {...pageProps} />
        </LayoutComponent>
        <FooterComponent />
      </div>
    </>
  );
}

export default MyApp;
