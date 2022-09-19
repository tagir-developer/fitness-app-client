import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation/Navigation';
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
  Observable,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { getToken, signIn, signOut } from './storage/asyncStorage';
import { AuthContext } from './context/authContext';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_USER_TOKEN } from './graphql/auth/mutations/user';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './common/theme';
import { AppState } from './context/app/appState';
import { TrainingProgramState } from './context/trainingProgram/trainingProgramState';
import { WorkoutState } from './context/workoutContext/workoutState';

// ? чтобы узнать правильный ip нужно выполнить команду ipconfig в cmd
const httpLink = new HttpLink({
  // uri: 'http://192.168.0.103:5000/graphql',
  uri: 'http://192.168.1.66:5000/graphql',
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

const getNewToken = async () => {
  const { refreshToken } = await getToken();

  const result = await apolloClient
    .mutate({
      mutation: REFRESH_USER_TOKEN,
      variables: { refreshToken },
    })
    .then(res => res.data);

  const { accessToken, refreshToken: newRefreshToken } = result.refresh;

  // rewrite tokens in async storage
  await signIn(accessToken, newRefreshToken);

  return accessToken;
};

const withToken = setContext(async () => {
  const { accessToken, refreshToken } = await getToken();
  return { accessToken, refreshToken };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // User access token has expired
    if (graphQLErrors && graphQLErrors[0].message === 'Unauthorized') {
      return new Observable(observer => {
        getNewToken()
          .then(accessToken => {
            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${accessToken}` || null,
              },
            }));
          })
          .then(() => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };

            // Retry last failed request
            forward(operation).subscribe(subscriber);
          })
          .catch((error: any) => {
            const unauthorizedError = new Error('Unauthorized');
            observer.error(unauthorizedError);
          });
      });
    }
  }
);

const authMiddleware = new ApolloLink((operation, forward) => {
  const { accessToken, refreshToken } = operation.getContext();
  operation.setContext(() => ({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  }));
  return forward(operation);
});

const link = ApolloLink.from([
  errorLink,
  withToken as unknown as ApolloLink,
  authMiddleware.concat(httpLink),
]);

apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  // ! Потом убрать код ниже
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'ignore',
  //   },
  //   query: {
  //     fetchPolicy: 'no-cache',
  //     errorPolicy: 'all',
  //   },
  // },
});

export default function App() {
  const isSourceLoadingComplete = useCachedResources();
  const [isTokenLoadingComplete, setIsTokenLoadingComplete] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChangeLoginState = (
    loggedInParam = false,
    accessToken?: string,
    refreshToken?: string
  ): void => {
    setLoggedIn(loggedInParam);

    if (loggedInParam && accessToken && refreshToken) {
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

  if (!isSourceLoadingComplete || !isTokenLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={myTheme}>
          <AuthContext.Provider value={{ loggedIn, handleChangeLoginState }}>
            <AppState>
              <WorkoutState>
                <TrainingProgramState>
                  <Navigation />
                  <StatusBar />
                </TrainingProgramState>
              </WorkoutState>
            </AppState>
          </AuthContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
