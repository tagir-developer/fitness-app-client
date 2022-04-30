import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { StyledButton } from '../../../components/ui/StyledButton';
import { StyledText } from '../../../components/ui/StyledText';
import { RESET_USER_PASSWORD } from '../../../graphql/mutations/user';
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

export default function ResetPasswordScreen({
  navigation,
}: TypeResetPasswordScreenProps) {
  const [form, setForm] = useState<TypeResetPasswordFormData>({
    email: '',
    emailError: false,
  });

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
        // Alert.alert(
        //   'Ссылка для сброса пароля отправлена на ваш email',
        //   data?.reset?.message ??
        //     'Проверьте почту и перейдите по ссылке, чтобы придумать новый пароль',
        //   [{ text: 'OK' }]
        // );

        navigation.navigate('SignIn');
      })
      .catch((e) => {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка', errorMessage, [{ text: 'OK' }]);

        const errors = resetServerValidationErrorHandler(errorMessage);

        passwordResetErrorHandler(errors, changeFormValues);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StyledText style={styles.title}>Сброс пароля</StyledText>

        <TextInput
          style={[styles.input, form.emailError && styles.inputError]}
          value={form.email}
          onChangeText={(value) =>
            changeFormValues({ email: value, emailError: false })
          }
          placeholder='Введите email'
          keyboardType={'email-address'}
          autoCorrect={false}
          autoCapitalize={'none'}
        />

        <StyledButton
          title='Отправить ссылку'
          onPress={sendResetMailHandler}
          style={styles.button}
        />

        <View style={styles.divider} />

        <Button
          title='Авторизация'
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#703415',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    backgroundColor: '#d8e1f4',
    fontSize: 18,
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  divider: {
    width: '80%',
    marginVertical: 30,
    height: 2,
    backgroundColor: 'grey',
  },
  button: {
    width: '80%',
    backgroundColor: '#68a741',
    marginVertical: 30,
    borderRadius: 10,
    fontSize: 24,
    fontFamily: 'roboto',
  },
});
