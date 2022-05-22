// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export enum SignedOutPageTypes {
  SIGN_IN = 'SignIn',
  REGISTER = 'Register',
  RESET_PASSWORD = 'ResetPassword',
  NEW_PASSWORD = 'NewPassword',
}

export enum PageTypes {
  HOME = 'Home',
  ABOUT = 'About',
  NOT_FOUND = 'NotFound',
  ALL_PROGRAMS = 'AllPrograms',
}

export type RootSignedInStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  About: undefined;
  NotFound: undefined;
  AllPrograms: undefined;
  //   Home: SomeType | undefined
};

export type RootSignedOutStackParamList = {
  SignIn: undefined;
  Register: undefined;
  // ResetPassword: { token: string };
  ResetPassword: undefined;
  NewPassword: { token: string };
};

export type RootStackParamList =
  | RootSignedInStackParamList
  | RootSignedOutStackParamList;
