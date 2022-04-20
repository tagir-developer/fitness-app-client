import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSignedInStackParamList } from '../../navigation/types';

export type TypeHomeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  'Home'
>;
