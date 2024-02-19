// graphql/apolloClient

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  // uri: 'https://stocksync-server.onrender.com',
  cache: new InMemoryCache(),
});
