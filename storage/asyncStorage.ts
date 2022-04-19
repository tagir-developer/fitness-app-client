import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

let accessToken: string | null | undefined;
let refreshToken: string | null | undefined;

export const getToken = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> => {
  if (accessToken && refreshToken) {
    return Promise.resolve({ accessToken, refreshToken });
  }

  accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

export const signIn = async (
  access: string,
  refresh: string
): Promise<void> => {
  accessToken = access;
  refreshToken = refresh;

  AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
  AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const signOut = async (): Promise<void> => {
  accessToken = undefined;
  refreshToken = undefined;

  AsyncStorage.removeItem(ACCESS_TOKEN);
  AsyncStorage.removeItem(REFRESH_TOKEN);
};

// const AUTH_TOKEN = 'AUTH_TOKEN';

// let token: string | null | undefined;

// export const getToken = async (): Promise<string | null> => {
//   if (token) {
//     return Promise.resolve(token);
//   }

//   token = await AsyncStorage.getItem(AUTH_TOKEN);

//   return token;
// };

// export const signIn = async (newToken: string): Promise<void> => {
//   token = newToken;
//   return AsyncStorage.setItem(AUTH_TOKEN, newToken);
// };

// export const signOut = async (): Promise<void> => {
//   token = undefined;
//   return AsyncStorage.removeItem(AUTH_TOKEN);
// };
