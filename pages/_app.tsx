import { Hydrate, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "../src/api";
import type { AppProps } from "next/app";
import Layout from "../src/components/Layout/Layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
