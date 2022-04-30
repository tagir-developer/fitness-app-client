import { EMAIL_REG_EXP } from '../../common/constants';
import {
  RegisterErrorTypes,
  TypeRegisterFormUpdateValues,
  TypeRegisterValidationErrors,
} from '../../screens/Auth/RegisterScreen/types';

export const validateRegisterData = (
  email: string,
  password: string
): TypeRegisterValidationErrors => {
  let errors: TypeRegisterValidationErrors = [];

  if (email.length === 0 || !EMAIL_REG_EXP.test(email)) {
    errors.push(RegisterErrorTypes.EMAIL_ERROR);
  }

  if (password.length < 5) {
    errors.push(RegisterErrorTypes.PASSWORD_ERROR);
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

export const registerServerValidationErrorHandler = (
  errorMessage: string
): TypeRegisterValidationErrors => {
  let errors: TypeRegisterValidationErrors = [];

  if (
    errorMessage.toLowerCase().includes('email') ||
    errorMessage.toLowerCase().includes('пароль')
  ) {
    errors.push(RegisterErrorTypes.EMAIL_ERROR);
    errors.push(RegisterErrorTypes.PASSWORD_ERROR);
  }

  return errors;
};
