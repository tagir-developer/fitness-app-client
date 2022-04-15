import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSignedOutStackParamList } from '../../../navigation/types';

export type TypeSignInScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  'SignIn'
>;
