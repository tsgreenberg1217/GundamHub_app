import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client/core';
import { mockCards } from '../../data/mockCards';

const mockLink = new ApolloLink((operation, _forward) =>
  new Observable(observer => {
    const timer = setTimeout(() => {
      if (operation.operationName === 'Cards') {
        observer.next({ data: { cards: mockCards } });
        observer.complete();
      } else {
        observer.error(new Error(`Mock: no handler for "${operation.operationName}"`));
      }
    }, 600);
    return () => clearTimeout(timer);
  }),
);

export const apolloClient = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
});
