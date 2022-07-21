import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeChooseExerciseForProgram = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM
>;

export type TypeExerciseListItem = {
  id: string;
  name: string;
  muscleGroups: string;
};
