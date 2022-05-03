import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RootSignedOutStackParamList,
  SignedOutPageTypes,
} from '../../../navigation/types';

export type TypeRegisterScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  SignedOutPageTypes.REGISTER
>;

export type TypeRegisterFormData = {
  email: string;
  emailError: boolean;
  password: string;
  passwordError: boolean;
};

export type TypeRegisterFormUpdateValues = {
  email?: string;
  emailError?: boolean;
  password?: string;
  passwordError?: boolean;
};

export enum RegisterErrorTypes {
  EMAIL_ERROR = 'emailError',
  PASSWORD_ERROR = 'passwordError',
}

export type TypeRegisterValidationErrors = RegisterErrorTypes[];

export type TypeRegisteredUserData = {
  accessToken: string;
  refreshToken: string;
  status: string;
  user: {
    id?: string;
    email?: string;
  };
};
