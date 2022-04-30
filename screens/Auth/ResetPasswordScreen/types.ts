import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSignedOutStackParamList } from '../../../navigation/types';

export type TypeResetPasswordScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  'ResetPassword'
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

export type TypeResetPasswordFormUpdateValues = {
  email?: string;
  emailError?: boolean;
};

export enum PasswordResetErrorTypes {
  EMAIL_ERROR = 'emailError',
}

export type TypePasswordResetErrors = PasswordResetErrorTypes[];

export type TypeResetPasswordFormData = {
  email: string;
  emailError: boolean;
};
