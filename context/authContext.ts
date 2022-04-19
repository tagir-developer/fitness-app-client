import { createContext, useContext } from 'react';

type TypeAuthContext = {
  loggedIn: boolean;
  handleChangeLoginState: (
    loggedIn: boolean,
    accessToken?: string,
    refreshToken?: string
  ) => void;
};

export const AuthContext = createContext<TypeAuthContext>({
  loggedIn: false,
  handleChangeLoginState: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
