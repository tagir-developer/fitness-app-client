import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeHomeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.ALL_PROGRAMS
>;

export type TypeTrainingProgram = {
  id: string;
  title: string;
  isUserProgram: boolean;
  imgUrl: string;
  img: ImageSourcePropType;
};
