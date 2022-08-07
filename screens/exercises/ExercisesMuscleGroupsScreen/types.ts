import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.EXERCISES_MUSCLE_GROUPS
>;

export type TypeMuscleGroupData = {
  id: string;
  name: string;
  previewImage: string;
};

export type TypeTransformedMuscleGroupData = Omit<
  TypeMuscleGroupData,
  'previewImage'
> & {
  previewImage: ImageSourcePropType;
};
