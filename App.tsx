import { StatusBar } from 'expo-status-bar';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.103:5000/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Navigation colorScheme={'light'} />
        <StatusBar />
      </ApolloProvider>
    );
  }
}
