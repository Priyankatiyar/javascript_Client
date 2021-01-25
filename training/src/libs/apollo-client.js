import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
// import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({ uri: 'http://localhost:9000/graphql' });

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
