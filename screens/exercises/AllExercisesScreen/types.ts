import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.ALL_EXERCISES
>;

export type TypeMuscleItem = {
  name: string;
  workLevel: {
    muscleWorkLevel: number;
  };
};

export type TypeExerciseData = {
  id: string;
  name: string;
  previewImage: string;
  muscles: TypeMuscleItem[];
};

export type TypeTransformedExerciseData = Omit<
  TypeExerciseData,
  'previewImage' | 'muscles'
> & {
  previewImage: ImageSourcePropType;
  muscles: string;
};
