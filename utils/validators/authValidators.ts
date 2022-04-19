import {
  TypeRegisterFormUpdateValues,
  TypeRegisterValidationErrors,
} from '../../screens/Auth/RegisterScreen/types';

export const validateRegisterData = (
  email: string,
  password: string
): TypeRegisterValidationErrors => {
  let errors: TypeRegisterValidationErrors = [];

  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  if (email.length === 0 || !emailRegExp.test(email)) {
    errors.push('emailError');
  }

  if (password.length < 5) {
    errors.push('passwordError');
  }

  return errors;
};

export const registerServerValidationErrorHandler = (
  errorMessage: string
): TypeRegisterValidationErrors => {
  let errors: TypeRegisterValidationErrors = [];

  if (errorMessage.toLowerCase().includes('email')) {
    errors.push('emailError');
  }

  if (errorMessage.toLowerCase().includes('пароль')) {
    errors.push('passwordError');
  }

  return errors;
};

export const registerValidationErrorHandler = (
  errors: TypeRegisterValidationErrors,
  setFormValuesHandler: (values: TypeRegisterFormUpdateValues) => void
): void => {
  if (errors.length > 0) {
    const values: TypeRegisterFormUpdateValues = {};

    errors.forEach((value) => {
      values[value] = true;
    });

    setFormValuesHandler(values);
  }
};
