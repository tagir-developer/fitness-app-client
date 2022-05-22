import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeHomeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.ALL_PROGRAMS
>;
