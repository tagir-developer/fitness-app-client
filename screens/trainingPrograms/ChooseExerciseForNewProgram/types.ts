import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeChooseExerciseForProgram = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM
>;

type TypeMuscleGroup = {
  id: string;
  name: string;
};

export type TypeExercises = {
  id: string;
  title: string;
  muscleGroups: TypeMuscleGroup[];
};
