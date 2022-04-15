import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';

let token: string | null | undefined;

export const getToken = async (): Promise<string | null> => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);

  return token;
};

export const signIn = async (newToken: string): Promise<void> => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = async (): Promise<void> => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN);
};
