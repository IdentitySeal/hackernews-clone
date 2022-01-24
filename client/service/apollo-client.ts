import { ApolloClient, NormalizedCacheObject, ApolloProvider, gql, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import utils from '../utils';
import AUTH_TOKEN from '../utils';


const authLink = setContext((_, { headers }) => {
  const token :string|null = typeof window !== 'undefined' ? localStorage.getItem(utils.AUTH_TOKEN) : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});



const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // link: httpLink,

    // headers: {
    //   authorization: localStorage.getItem('token') || '',
    // },
  
  });

  export default client;
