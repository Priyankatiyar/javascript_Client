import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

const httpLink = new HttpLink({ uri: 'http://localhost:9000/graphql' });

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:9000/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const Apolloclient = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

export default Apolloclient;
