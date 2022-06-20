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
  CREATE_PROGRAM = 'CreateProgram',
  ADD_EXERCISE_TO_PROGRAM = 'AddExerciseToProgram',
  CHOOSE_EXERCISE_FOR_NEW_PROGRAM = 'ChooseExerciseForNewProgram',
  EDIT_PROGRAM = 'EditProgram',
}

export type RootSignedInStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  [PageTypes.HOME]: undefined;
  [PageTypes.ABOUT]: undefined;
  [PageTypes.NOT_FOUND]: undefined;
  [PageTypes.ALL_PROGRAMS]: undefined;
  [PageTypes.CREATE_PROGRAM]: { programName: string };
  [PageTypes.ADD_EXERCISE_TO_PROGRAM]: { dayName: string };
  [PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM]: undefined;
  [PageTypes.EDIT_PROGRAM]: { programId: string };
  //   Home: SomeType | undefined
};

export type RootSignedOutStackParamList = {
  [SignedOutPageTypes.SIGN_IN]: undefined;
  [SignedOutPageTypes.REGISTER]: undefined;
  [SignedOutPageTypes.RESET_PASSWORD]: undefined;
  [SignedOutPageTypes.NEW_PASSWORD]: { token: string };
};

export type RootStackParamList =
  | RootSignedInStackParamList
  | RootSignedOutStackParamList;
