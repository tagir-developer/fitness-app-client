import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AppButton } from '../../../components/buttons/AppButton';
import { LinkButton } from '../../../components/buttons/LinkButton';
import { AuthScreenTitle } from '../../../components/typography/AuthScreenTitle';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import MainLayout from '../../../components/ui/MainLayout';
import { useAuthContext } from '../../../context/authContext';
import { REGISTER_NEW_USER } from '../../../graphql/mutations/user';
import { SignedOutPageTypes } from '../../../navigation/types';
import {
  registerServerValidationErrorHandler,
  registerValidationErrorHandler,
  validateRegisterData,
} from '../../../utils/validators/authValidators';
import {
  TypeRegisteredUserData,
  TypeRegisterFormData,
  TypeRegisterFormUpdateValues,
  TypeRegisterScreenProps,
} from './types';

export default function RegisterScreen({
  navigation,
}: TypeRegisterScreenProps) {
  const [form, setForm] = useState<TypeRegisterFormData>({
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
  });

  const { handleChangeLoginState } = useAuthContext();

  const [registerUser] = useMutation(REGISTER_NEW_USER);

  const changeFormValues = (values: TypeRegisterFormUpdateValues): void => {
    const newFormData = {
      ...form,
      ...values,
    };

    setForm(newFormData);
  };

  const registerHandler = () => {
    Keyboard.dismiss();

    // validate form values
    const { email, password } = form;

    const errors = validateRegisterData(email, password);

    registerValidationErrorHandler(errors, changeFormValues);

    if (errors.length > 0) {
      Alert.alert('Ошибка Валидации', 'Введите корректные данные', [
        { text: 'OK' },
      ]);
      return;
    }

    // send graphql request
    registerUser({
      variables: { user: { email, password } },
    })
      .then(({ data }) => {
        const userData: TypeRegisteredUserData = data.register;

        handleChangeLoginState(
          true,
          userData.accessToken,
          userData.refreshToken
        );

        setForm({
          ...form,
          email: '',
          password: '',
        });
      })
      .catch((e) => {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка регистрации', errorMessage, [{ text: 'OK' }]);

        const errors = registerServerValidationErrorHandler(errorMessage);

        registerValidationErrorHandler(errors, changeFormValues);
      });
  };

  return (
    <MainLayout loadingSourcesCount={1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AppFlex flex='1'>
          <AuthScreenTitle mb='30px' size='40px'>
            РЕГИСТРАЦИЯ
          </AuthScreenTitle>

          <AppTextInput
            error={form.emailError}
            value={form.email}
            onChangeText={(value) =>
              changeFormValues({ email: value, emailError: false })
            }
            placeholder='Введите email'
            mb='20px'
          />

          <AppTextInput
            error={form.passwordError}
            value={form.password}
            onChangeText={(value) =>
              changeFormValues({ password: value, passwordError: false })
            }
            placeholder='Придумайте пароль'
            isPassword
            mb='40px'
          />

          <AppButton
            title='Зарегистрироваться'
            onPress={registerHandler}
            mb='30px'
          />

          <LinkButton
            title='Войти в систему'
            onPress={() => navigation.navigate(SignedOutPageTypes.SIGN_IN)}
            underline
            size='18px'
            mb='40px'
          />
        </AppFlex>
      </TouchableWithoutFeedback>
    </MainLayout>
  );
}
