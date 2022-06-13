import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeAddExerciseToProgram = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.ADD_EXERCISE_TO_PROGRAM
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
