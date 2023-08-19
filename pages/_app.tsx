import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import React from "react";
import Head from "next/head";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <Windmill usePreferences={true}>
      <Head>
        <title>Berdry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </Windmill>
  );
}
export default MyApp;
