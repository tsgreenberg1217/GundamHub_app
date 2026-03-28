import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { GRAPHQL_URL } from '../constants/api';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
});
