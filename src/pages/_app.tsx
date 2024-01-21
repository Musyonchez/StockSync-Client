// pages/_app.tsx

import '@/styles/globals.css'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const apolloClient = new ApolloClient({
  uri: "https://stocksync-server.onrender.com/", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
