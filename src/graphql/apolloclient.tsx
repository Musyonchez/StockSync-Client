// graphql/apolloClient

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  cache: new InMemoryCache(),
});
