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
  from,
  NormalizedCacheObject,
  fromPromise,
  Observable,
} from '@apollo/client';
import { createContext, useEffect, useState } from 'react';
import { getToken, signIn, signOut } from './storage/asyncStorage';
import { AuthContext } from './context/authContext';
import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_USER_TOKEN } from './graphql/mutations/user';

const httpLink = new HttpLink({
  uri: 'http://192.168.0.103:5000/graphql',
});
// const authLink = setContext(async (req, { headers }) => {
//   const { accessToken } = await getToken();

//   return {
//     ...headers,
//     headers: {
//       authorization: accessToken ? `Bearer ${accessToken}` : null,
//     },
//   };
// });

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   console.log('ОБРАБОТКА ОШИБОК - graphQLErrors', graphQLErrors);
//   console.log('ОБРАБОТКА ОШИБОК - networkError', networkError);

//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

let apolloClient: ApolloClient<NormalizedCacheObject>;

// const getNewToken = () => {
//   return apolloClient
//     .query({ query: REFRESH_USER_TOKEN, variables: { refreshToken: 'sdf' } })
//     .then((response) => {
//       // extract your accessToken from your response data and return it
//       const { accessToken } = response.data;
//       console.log('ПОЛУЧЕННАЯ ДАТА - getNewToken', response.data);
//       console.log('ПОЛУЧЕННЫЙ ТОКЕН - getNewToken', accessToken);
//       return accessToken;
//     });
// };

const getNewToken = async () => {
  const { refreshToken } = await getToken();
  const result = await apolloClient
    .mutate({
      mutation: REFRESH_USER_TOKEN,
      variables: { refreshToken },
    })
    .then((result) => result.data);

  const { accessToken, refreshToken: newRefreshToken } = result.refresh;

  // console.log('ПОЛУЧЕННАЯ ДАТА - getNewToken - result', result);
  console.log('ПОЛУЧЕННАЯ ДАТА - getNewToken - accessToken', accessToken);
  console.log(
    'ПОЛУЧЕННАЯ ДАТА - getNewToken - newRefreshToken',
    newRefreshToken
  );
  // .then((response) => {
  //   // extract your accessToken from your response data and return it
  //   const { accessToken } = response.data;
  //   console.log('ПОЛУЧЕННАЯ ДАТА - getNewToken', response.data);
  //   console.log('ПОЛУЧЕННЫЙ ТОКЕН - getNewToken', accessToken);
  //   return accessToken;
  // });
  await signIn(accessToken, newRefreshToken);

  return accessToken;
};

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     console.log('ОБРАБОТКА ОШИБОК - graphQLErrors', graphQLErrors);
//     console.log('ОБРАБОТКА ОШИБОК - networkError', networkError);

//     const result = fromPromise(
//       getNewToken().catch((error) => {
//         // ! (Здесь уже окончательно выбрасываем пользователя) Handle token refresh errors e.g clear stored tokens, redirect to login
//         console.log('getNewToken - catch error', getNewToken);
//         return;
//       })
//     )
//       .filter((value) => Boolean(value))
//       .flatMap((accessToken) => {
//         console.log('ОБРАБОТКА ОШИБОК - accessToken', accessToken);
//         return forward(operation);
//         // const oldHeaders = operation.getContext().headers;
//         // // modify the operation context with a new token
//         // operation.setContext({
//         //   headers: {
//         //     ...oldHeaders,
//         //     authorization: `Bearer ${accessToken}`,
//         //   },
//         // });

//         // // retry the request, returning the new observable
//         // return forward(operation);
//       });

//     // if (graphQLErrors) {
//     //   for (let err of graphQLErrors) {
//     //     console.log('ОБРАБОТКА ОШИБОК - err', err);
//     //     switch (err.extensions.code) {
//     //       case 'UNAUTHENTICATED':
//     //         return fromPromise(
//     //           getNewToken().catch((error) => {
//     //             // Handle token refresh errors e.g clear stored tokens, redirect to login
//     //             return;
//     //           })
//     //         )
//     //           .filter((value) => Boolean(value))
//     //           .flatMap((accessToken) => {
//     //             const oldHeaders = operation.getContext().headers;
//     //             // modify the operation context with a new token
//     //             operation.setContext({
//     //               headers: {
//     //                 ...oldHeaders,
//     //                 authorization: `Bearer ${accessToken}`,
//     //               },
//     //             });

//     //             // retry the request, returning the new observable
//     //             return forward(operation);
//     //           });
//     //     }
//     //   }
//     // }
//   }
// );

const withToken = setContext(async () => {
  const { accessToken, refreshToken } = await getToken();
  return { accessToken, refreshToken };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // User access token has expired
    if (graphQLErrors && graphQLErrors[0].message === 'Unauthorized') {
      // We assume we have both tokens needed to run the async request
      // Let's refresh token through async request
      console.log('Получили ошибку неавторизованного пользователя');
      return new Observable((observer) => {
        getNewToken()
          .then((accessToken) => {
            console.log(
              'Успешно получили accessToken из метода getNewToken',
              accessToken
            );
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
            // No refresh or client token available, we force user to login
            console.log('ERROR - в цепочке onError', error);
            const graphqlError = new Error('Unauthorized');
            // observer.error(error);
            observer.error(graphqlError);
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
  // link: link as unknown as ApolloLink,
  // link: from([errorLink, authLink]),
  link,
  cache: new InMemoryCache(),
  // ! Потом убрать код ниже
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
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
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider value={{ loggedIn, handleChangeLoginState }}>
          <Navigation colorScheme={'light'} />
          <StatusBar />
        </AuthContext.Provider>
      </ApolloProvider>
    );
  }
}
