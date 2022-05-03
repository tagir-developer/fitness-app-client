import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AppButton } from '../../../components/buttons/AppButton';
import { LinkButton } from '../../../components/buttons/LinkButton';
import { AuthScreenTitle } from '../../../components/typography/AuthScreenTitle';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import MainLayout from '../../../components/ui/MainLayout';
import { CHANGE_USER_PASSWORD } from '../../../graphql/mutations/user';
import { SignedOutPageTypes } from '../../../navigation/types';
import {
  changePasswordErrorHandler,
  newPasswordServerValidationErrorHandler,
  validateChangePasswordFormData,
} from '../../../utils/validators/resetPasswordValidators';
import {
  TypeNewPasswordFormData,
  TypeNewPasswordFormUpdateValues,
  TypeNewPasswordScreenProps,
} from './types';

export default function NewPasswordScreen({
  route,
  navigation,
}: TypeNewPasswordScreenProps) {
  const { token } = route.params;

  const [form, setForm] = useState<TypeNewPasswordFormData>({
    password: '',
    passwordError: false,
    confirmPassword: '',
    confirmError: false,
  });

  const changeFormValues = (values: TypeNewPasswordFormUpdateValues): void => {
    const newFormData = {
      ...form,
      ...values,
    };

    setForm(newFormData);
  };

  const [changePassword] = useMutation(CHANGE_USER_PASSWORD);

  const changePasswordHandler = () => {
    // validate form values
    const { password, confirmPassword } = form;

    const errors = validateChangePasswordFormData(password, confirmPassword);

    changePasswordErrorHandler(errors, changeFormValues);

    if (errors.length > 0) {
      Alert.alert('Ошибка Валидации', 'Введите корректные данные', [
        { text: 'OK' },
      ]);
      return;
    }

    // send graphql request
    changePassword({
      variables: { data: { password, confirmPassword, token } },
    })
      .then(({ data }) => {
        console.log('Пароль успешно изменен', data?.changePassword?.message);

        Alert.alert(
          'Успешная операция',
          data?.changePassword?.message ??
            'Вы успешно изменили пароль. Можете войти в приложение, используя новый пароль',
          [{ text: 'OK' }]
        );

        navigation.navigate('SignIn');
      })
      .catch((e) => {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        console.log('Ошибка изменения пароля', errorMessage);

        Alert.alert('Ошибка', errorMessage, [{ text: 'OK' }]);

        if (
          errorMessage.includes('ссылка восстановления пароля недействительна')
        ) {
          navigation.navigate('SignIn');
        }

        const errors = newPasswordServerValidationErrorHandler(errorMessage);

        changePasswordErrorHandler(errors, changeFormValues);
      });
  };

  return (
    <MainLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AppFlex flex='1'>
          <AuthScreenTitle mb='42px'>СБРОС ПАРОЛЯ</AuthScreenTitle>

          <AppTextInput
            error={form.passwordError}
            value={form.password}
            onChangeText={(value) =>
              changeFormValues({ password: value, passwordError: false })
            }
            placeholder='Новый пароль'
            isPassword
            mb='20px'
          />

          <AppTextInput
            error={form.confirmError}
            value={form.confirmPassword}
            onChangeText={(value) =>
              changeFormValues({ confirmPassword: value, confirmError: false })
            }
            placeholder='Повторите пароль'
            isPassword
            mb='40px'
          />

          <AppButton
            title='Сохранить'
            onPress={changePasswordHandler}
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
