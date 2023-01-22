import "../styles.css";
import React from "react";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../components/GlobalStyles";

const GlobalStylesProxy: any = GlobalStyles;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStylesProxy />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
