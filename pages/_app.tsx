import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  FooterComponent,
  HeaderComponent,
} from "../components/componentProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
      <FooterComponent />
    </>
  );
}

export default MyApp;
