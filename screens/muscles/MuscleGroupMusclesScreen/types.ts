import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.MUSCLE_GROUP_MUSCLES
>;

export type TypeMuscleData = {
  id: string;
  name: string;
  previewImage: string;
};

export type TypeTransformedMuscleData = Omit<TypeMuscleData, 'previewImage'> & {
  previewImage: ImageSourcePropType;
};
