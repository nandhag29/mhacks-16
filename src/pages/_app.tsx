import '@/styles/globals.css'
import { AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import Head from "next/head"

const ASLLearner: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>ASL EVO</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default ASLLearner;
