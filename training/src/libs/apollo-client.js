import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from '@apollo/client/link/context';

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

const Apolloclient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default Apolloclient;
