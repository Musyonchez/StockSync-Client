import "@/styles/globals.css";
import "@/styles/404.css";
import "@/styles/loading.css"

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import store from '../store'; // Adjust the path accordingly
import type { AppProps } from "next/app";

const apolloClient = new ApolloClient({
  uri: process.env.SERVER_PUBLIC_URL || "http://localhost:5000/graphql",
  // uri: 'https://stocksync-server.onrender.com',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
