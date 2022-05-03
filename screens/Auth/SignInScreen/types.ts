import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RootSignedOutStackParamList,
  SignedOutPageTypes,
} from '../../../navigation/types';

export type TypeSignInScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  SignedOutPageTypes.SIGN_IN
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
