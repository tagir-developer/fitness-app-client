import { StatusBar } from 'expo-status-bar';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  RequestHandler,
} from '@apollo/client';
import { createContext, useEffect, useState } from 'react';
import { getToken, signIn, signOut } from './storage/asyncStorage';
import { AuthContext } from './context/authContext';
import { setContext } from 'apollo-link-context';

const httpLink: any = new HttpLink({
  uri: 'http://192.168.0.103:5000/graphql',
});
const authLink = setContext(async (req, { headers }) => {
  const { accessToken } = await getToken();

  return {
    ...headers,
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link: link as unknown as ApolloLink,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'http://192.168.0.103:5000/graphql',
//   cache: new InMemoryCache(),
// });

export default function App() {
  const isSourceLoadingComplete = useCachedResources();
  const [isTokenLoadingComplete, setIsTokenLoadingComplete] = useState(false);

  // const colorScheme = useColorScheme();

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChangeLoginState = (
    loggedInParam = false,
    accessToken?: string,
    refreshToken?: string
  ): void => {
    console.log('handleChangeLoginState - loggedInParam', loggedInParam);
    setLoggedIn(loggedInParam);

    if (loggedInParam && accessToken && refreshToken) {
      console.log('Конечная цель!!!!');
      signIn(accessToken, refreshToken);
    } else {
      signOut();
    }
  };

  useEffect(() => {
    const checkAuthTokens = async () => {
      const { accessToken, refreshToken } = await getToken();
      if (accessToken && refreshToken) {
        setLoggedIn(true);
      }
    };

    checkAuthTokens();

    setIsTokenLoadingComplete(true);
  }, []);

  console.log('Значение - loggedIn', loggedIn);

  if (!isSourceLoadingComplete || !isTokenLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider value={{ loggedIn, handleChangeLoginState }}>
          <Navigation colorScheme={'light'} />
          <StatusBar />
        </AuthContext.Provider>
      </ApolloProvider>
    );
  }
}
