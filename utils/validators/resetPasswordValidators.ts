import { EMAIL_REG_EXP } from '../../common/constants';
import {
  ChangePasswordErrorTypes,
  TypeChangePasswordErrors,
  TypeNewPasswordFormUpdateValues,
} from '../../screens/Auth/NewPasswordScreen/types';
import {
  PasswordResetErrorTypes,
  TypePasswordResetErrors,
  TypeResetPasswordFormUpdateValues,
} from '../../screens/Auth/ResetPasswordScreen/types';

// валидация формы отправки email для сброса пароля
export const validatePasswordResetData = (
  email: string
): TypePasswordResetErrors => {
  let errors: TypePasswordResetErrors = [];

  if (email.length === 0 || !EMAIL_REG_EXP.test(email)) {
    errors.push(PasswordResetErrorTypes.EMAIL_ERROR);
  }

  return errors;
};

export const passwordResetErrorHandler = (
  errors: TypePasswordResetErrors,
  setFormValuesHandler: (values: TypeResetPasswordFormUpdateValues) => void
): void => {
  if (errors.length > 0) {
    const values: TypeResetPasswordFormUpdateValues = {};

    errors.forEach((value) => {
      values[value] = true;
    });

    setFormValuesHandler(values);
  }
};

export const resetServerValidationErrorHandler = (
  errorMessage: string
): TypePasswordResetErrors => {
  let errors: TypePasswordResetErrors = [];

  if (errorMessage.toLowerCase().includes('email')) {
    errors.push(PasswordResetErrorTypes.EMAIL_ERROR);
  }

  return errors;
};

// Валидация смены пароля
export const validateChangePasswordFormData = (
  password: string,
  confirmPassword: string
): TypeChangePasswordErrors => {
  let errors: TypeChangePasswordErrors = [];

  if (password.length < 5) {
    errors.push(ChangePasswordErrorTypes.PASSWORD_ERROR);
  }

  if (password !== confirmPassword) {
    errors.push(ChangePasswordErrorTypes.CONFIRM_ERROR);
  }

  return errors;
};

export const changePasswordErrorHandler = (
  errors: TypeChangePasswordErrors,
  setFormValuesHandler: (values: TypeNewPasswordFormUpdateValues) => void
): void => {
  if (errors.length > 0) {
    const values: TypeNewPasswordFormUpdateValues = {};

    errors.forEach((value) => {
      values[value] = true;
    });

    setFormValuesHandler(values);
  }
};

export const newPasswordServerValidationErrorHandler = (
  errorMessage: string
): TypeChangePasswordErrors => {
  let errors: TypeChangePasswordErrors = [];

  if (errorMessage.toLowerCase().includes('password')) {
    errors.push(ChangePasswordErrorTypes.PASSWORD_ERROR);
  }

  if (errorMessage.toLowerCase().includes('confirmPassword')) {
    errors.push(ChangePasswordErrorTypes.CONFIRM_ERROR);
  }

  return errors;
};
