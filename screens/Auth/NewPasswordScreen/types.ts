import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RootSignedOutStackParamList,
  SignedOutPageTypes,
} from '../../../navigation/types';

export type TypeNewPasswordScreenProps = NativeStackScreenProps<
  RootSignedOutStackParamList,
  SignedOutPageTypes.NEW_PASSWORD
>;

export type TypeSuccessResponseData = {
  message: string;
};

export type TypeNewPasswordFormUpdateValues = {
  password?: string;
  passwordError?: boolean;
  confirmPassword?: string;
  confirmError?: boolean;
};

export enum ChangePasswordErrorTypes {
  PASSWORD_ERROR = 'passwordError',
  CONFIRM_ERROR = 'confirmError',
}

export type TypeChangePasswordErrors = ChangePasswordErrorTypes[];

export type TypeNewPasswordFormData = {
  password: string;
  passwordError: boolean;
  confirmPassword: string;
  confirmError: boolean;
};
