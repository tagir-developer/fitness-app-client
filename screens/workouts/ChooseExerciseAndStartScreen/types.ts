import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CHOOSE_EXERCISE_AND_START
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
