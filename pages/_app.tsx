import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  FooterComponent,
  HeaderComponent,
  LayoutComponent,
} from "../components/componentProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderComponent />
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
      <FooterComponent />
    </>
  );
}

export default MyApp;
