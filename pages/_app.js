import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { theme } from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ServerErrorPage from "./500";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === "/500") {
    return <ServerErrorPage />;
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
