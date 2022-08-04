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
  PROGRAM_DETAIL = 'ProgramDetail',
  MUSCLE_GROUPS = 'MuscleGroups',
  ALL_MUSCLES = 'AllMuscles',
  MUSCLE_GROUP_MUSCLES = 'MuscleGroupMuscles',
  MUSCLE_DETAIL = 'MuscleDetail',
}

export enum TypeCreateExercisePageTypes {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

export type RootSignedInStackParamList = {
  // Root: NavigatorScreenParams<RootTabParamList> | undefined;
  [PageTypes.HOME]: undefined;
  [PageTypes.ABOUT]: undefined;
  [PageTypes.NOT_FOUND]: undefined;
  [PageTypes.ALL_PROGRAMS]: undefined;
  [PageTypes.CREATE_PROGRAM]: {
    programName?: string;
    programId?: string;
    pageType: TypeCreateExercisePageTypes;
  };
  [PageTypes.ADD_EXERCISE_TO_PROGRAM]: {
    dayName: string;
    pageType: TypeCreateExercisePageTypes;
  };
  [PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM]: undefined;
  [PageTypes.PROGRAM_DETAIL]: { programId: string };
  [PageTypes.EDIT_PROGRAM]: { programId: string }; // ! потом удалим
  [PageTypes.MUSCLE_GROUPS]: undefined;
  [PageTypes.ALL_MUSCLES]: undefined;
  [PageTypes.MUSCLE_GROUP_MUSCLES]: {
    muscleGroupId: string;
  };
  [PageTypes.MUSCLE_DETAIL]: {
    muscleId: string;
  };
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
