import { StatusBar } from 'expo-status-bar';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { signIn, signOut } from './storage/asyncStorage';

const client = new ApolloClient({
  uri: 'http://192.168.0.103:5000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // ? Возможно лучше назвать loggedIn
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleChangeLoginState = (loggedIn = false, token: string) => {
    setIsSignedIn(loggedIn);

    if (isSignedIn) {
      signIn(token);
    } else {
      signOut();
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Navigation colorScheme={'light'} isSignedIn={isSignedIn} />
        <StatusBar />
      </ApolloProvider>
    );
  }
}
