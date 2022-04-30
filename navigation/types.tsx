// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootSignedInStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  About: undefined;
  NotFound: undefined;
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
