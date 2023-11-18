import '@/styles/globals.css'
import { AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react"

const ASLLearner: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default ASLLearner;
