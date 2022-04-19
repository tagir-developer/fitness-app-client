import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSignedOutStackParamList } from '../../../navigation/types';

export type TypeSignInScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  'SignIn'
>;

export type TypeSignedInUserData = {
  accessToken: string;
  refreshToken: string;
  status: string;
  user: {
    id?: string;
    email?: string;
  };
};
