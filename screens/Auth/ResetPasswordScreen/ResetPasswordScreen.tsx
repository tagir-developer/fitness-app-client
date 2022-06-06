import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AppButton } from '../../../components/buttons/AppButton';
import { LinkButton } from '../../../components/buttons/LinkButton';
import { AppText } from '../../../components/typography/AppText';
import { AuthScreenTitle } from '../../../components/typography/AuthScreenTitle';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import MainLayout from '../../../components/ui/MainLayout';
import { RESET_USER_PASSWORD } from '../../../graphql/mutations/user';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { SignedOutPageTypes } from '../../../navigation/types';
import {
  passwordResetErrorHandler,
  resetServerValidationErrorHandler,
  validatePasswordResetData,
} from '../../../utils/validators/resetPasswordValidators';
import {
  TypeResetPasswordFormData,
  TypeResetPasswordFormUpdateValues,
  TypeResetPasswordScreenProps,
} from './types';

const SCREEN_SOURCES_COUNT = 1;

export default function ResetPasswordScreen({
  navigation,
}: TypeResetPasswordScreenProps) {
  const [form, setForm] = useState<TypeResetPasswordFormData>({
    email: '',
    emailError: false,
  });

  const loading = useGetSourcesLoadingState(SCREEN_SOURCES_COUNT);

  const changeFormValues = (
    values: TypeResetPasswordFormUpdateValues
  ): void => {
    const newFormData = {
      ...form,
      ...values,
    };

    setForm(newFormData);
  };

  const [sendMePasswordResetLink] = useMutation(RESET_USER_PASSWORD);

  const sendResetMailHandler = () => {
    Keyboard.dismiss();

    // validate form values
    const { email } = form;

    const errors = validatePasswordResetData(email);

    passwordResetErrorHandler(errors, changeFormValues);

    if (errors.length > 0) {
      Alert.alert('Ошибка Валидации', 'Введите корректные данные', [
        { text: 'OK' },
      ]);
      return;
    }

    // send graphql request
    sendMePasswordResetLink({
      variables: { email },
    })
      .then(({ data }) => {
        console.log(
          'Ссылка для сброса отправлена на email',
          data?.reset?.message
        );

        Alert.alert(
          'Ссылка для сброса пароля отправлена на ваш email',
          data?.reset?.message ??
            'Проверьте почту и перейдите по ссылке, чтобы придумать новый пароль'
        );

        navigation.navigate(SignedOutPageTypes.SIGN_IN);
      })
      .catch((e) => {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка', errorMessage, [{ text: 'OK' }]);

        const serverErrors = resetServerValidationErrorHandler(errorMessage);

        passwordResetErrorHandler(serverErrors, changeFormValues);
      });
  };

  return (
    <MainLayout loading={loading}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AppFlex flex='1'>
          <AuthScreenTitle mb='20px' size='32px'>
            ЗАБЫЛИ ПАРОЛЬ?
          </AuthScreenTitle>

          <AppText
            size='16px'
            w='80%'
            color='#8E8E93'
            textAlign='center'
            mb='30px'
          >
            Укажите email, указанный при регистрации. Мы вышлем на него ссылку
            для сброса пароля.
          </AppText>

          <AppTextInput
            error={form.emailError}
            value={form.email}
            onChangeText={(value) =>
              changeFormValues({ email: value, emailError: false })
            }
            placeholder='Введите email'
            keyboardType={'email-address'}
            mb='40px'
          />

          <AppButton
            title='Отправить ссылку'
            onPress={sendResetMailHandler}
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
