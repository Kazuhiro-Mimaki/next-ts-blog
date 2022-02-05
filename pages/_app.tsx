import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  HeaderComponent,
  FooterComponent,
} from "../components/componentProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} className="main" />
      <FooterComponent />
    </>
  );
}

export default MyApp;
