// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootSignedInStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  NotFound: undefined;
  //   Home: SomeType | undefined
};

export type RootSignedOutStackParamList = {
  SignIn: undefined;
  Register: undefined;
};

export type RootStackParamList =
  | RootSignedInStackParamList
  | RootSignedOutStackParamList;
