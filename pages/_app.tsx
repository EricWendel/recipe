import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="shortcut icon" href="/recipeLogo.png" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
