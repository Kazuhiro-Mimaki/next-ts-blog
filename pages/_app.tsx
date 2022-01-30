import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HeaderComponent } from "../components/componentProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
