import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI = 'http://192.168.1.107:4000/';

const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});

export default client;
