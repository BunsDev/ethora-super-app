import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";

import Web3Provider from "../context/Web3Provider";

import { AuthGuard } from "@/components/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Web3Provider>
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      </Web3Provider>
    </Layout>
  );
}
