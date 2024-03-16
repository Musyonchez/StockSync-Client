// graphql/apolloClient

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.SERVER_PUBLIC_URL || "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});


