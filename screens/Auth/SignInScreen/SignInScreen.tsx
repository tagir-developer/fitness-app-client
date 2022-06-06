import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AuthScreenTitle } from '../../../components/typography/AuthScreenTitle';
import { AppButton } from '../../../components/buttons/AppButton';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import MainLayout from '../../../components/ui/MainLayout';
import { useAuthContext } from '../../../context/authContext';
import { LOGIN_USER } from '../../../graphql/mutations/user';
import {
  registerServerValidationErrorHandler,
  registerValidationErrorHandler,
  validateRegisterData,
} from '../../../utils/validators/authValidators';
import {
  TypeRegisterFormData,
  TypeRegisterFormUpdateValues,
} from '../RegisterScreen/types';
import { TypeSignedInUserData, TypeSignInScreenProps } from './types';
import { LinkButton } from '../../../components/buttons/LinkButton';
import { SignedOutPageTypes } from '../../../navigation/types';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';

const SCREEN_SOURCES_COUNT = 1;

export default function SignInScreen({ navigation }: TypeSignInScreenProps) {
  const [form, setForm] = useState<TypeRegisterFormData>({
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
  });

  const loading = useGetSourcesLoadingState(SCREEN_SOURCES_COUNT);

  const changeFormValues = (values: TypeRegisterFormUpdateValues): void => {
    const newFormData = {
      ...form,
      ...values,
    };

    setForm(newFormData);
  };

  const { handleChangeLoginState } = useAuthContext();

  const [loginUser] = useMutation(LOGIN_USER);

  const loginHandler = () => {
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
    loginUser({
      variables: { user: { email, password } },
    })
      .then(({ data }) => {
        const userData: TypeSignedInUserData = data.login;

        console.log('Данные после авторизации', userData);

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

        Alert.alert('Ошибка авторизации', errorMessage, [{ text: 'OK' }]);

        const serverErrors = registerServerValidationErrorHandler(errorMessage);

        registerValidationErrorHandler(serverErrors, changeFormValues);
      });
  };

  return (
    <MainLayout loading={loading}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AppFlex flex='1'>
          <AuthScreenTitle mb='30px'>ВХОД В СИСТЕМУ</AuthScreenTitle>

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
            placeholder='Введите пароль'
            isPassword
            mb='40px'
          />

          <AppButton title='Войти' onPress={loginHandler} mb='30px' />

          <LinkButton
            title='Зарегистрироваться'
            onPress={() => navigation.navigate(SignedOutPageTypes.REGISTER)}
            underline
            size='18px'
            mb='40px'
          />

          <LinkButton
            title='Забыли пароль?'
            onPress={() =>
              navigation.navigate(SignedOutPageTypes.RESET_PASSWORD)
            }
            size='16px'
            color='#6B6B6B'
            underline
          />
        </AppFlex>
      </TouchableWithoutFeedback>
    </MainLayout>
  );
}
