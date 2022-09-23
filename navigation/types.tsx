// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

import { TypeTransformedExerciseData } from '../screens/exercises/AllExercisesScreen/types';

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
  // training program
  ALL_PROGRAMS = 'AllPrograms',
  CREATE_PROGRAM = 'CreateProgram',
  ADD_EXERCISE_TO_PROGRAM = 'AddExerciseToProgram',
  CHOOSE_EXERCISE_FOR_NEW_PROGRAM = 'ChooseExerciseForNewProgram',
  EDIT_PROGRAM = 'EditProgram',
  PROGRAM_DETAIL = 'ProgramDetail',
  // muscles
  MUSCLE_GROUPS = 'MuscleGroups',
  ALL_MUSCLES = 'AllMuscles',
  MUSCLE_GROUP_MUSCLES = 'MuscleGroupMuscles',
  MUSCLE_DETAIL = 'MuscleDetail',
  // exercises
  EXERCISES_MUSCLE_GROUPS = 'ExerciseGroups',
  ALL_EXERCISES = 'AllExercises',
  MUSCLE_GROUP_EXERCISES = 'MuscleGroupExercises',
  EXERCISE_DETAIL = 'ExerciseDetail',
  // workout
  CHOOSE_WORKOUT_DAY = 'ChooseWorkoutDay',
  CHOOSE_EXERCISE_AND_START = 'ChooseExerciseAndStart',
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
  // training programs
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
  [PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM]: {
    callback: (exercise: TypeTransformedExerciseData) => void;
  };
  [PageTypes.PROGRAM_DETAIL]: { programId: string };
  // muscles
  [PageTypes.MUSCLE_GROUPS]: undefined;
  [PageTypes.ALL_MUSCLES]: undefined;
  [PageTypes.MUSCLE_GROUP_MUSCLES]: {
    muscleGroupId: string;
  };
  [PageTypes.MUSCLE_DETAIL]: {
    muscleId: string;
  };
  // exercises
  [PageTypes.EXERCISES_MUSCLE_GROUPS]: undefined;
  [PageTypes.ALL_EXERCISES]: undefined;
  [PageTypes.MUSCLE_GROUP_EXERCISES]: {
    muscleGroupId: string;
  };
  [PageTypes.EXERCISE_DETAIL]: {
    exerciseId: string;
  };
  // workout
  [PageTypes.CHOOSE_WORKOUT_DAY]: undefined;
  [PageTypes.CHOOSE_EXERCISE_AND_START]: {
    dayId: string;
    dayName: string;
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
