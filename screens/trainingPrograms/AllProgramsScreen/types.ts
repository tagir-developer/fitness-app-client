import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import { TypeTrainingProgram } from '../../../context/trainingProgram/types';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeHomeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.ALL_PROGRAMS
>;

export type TypeProgramData = Omit<TypeTrainingProgram, 'days'>;

export type TypeTransformedProgramData = Omit<
  TypeProgramData,
  'previewImage'
> & {
  previewImage: ImageSourcePropType;
};
