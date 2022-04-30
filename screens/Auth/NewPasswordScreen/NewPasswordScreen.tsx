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
import { CHANGE_USER_PASSWORD } from '../../../graphql/mutations/user';
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StyledText style={styles.title}>Придумайте пароль</StyledText>

        <TextInput
          style={[styles.input, form.passwordError && styles.inputError]}
          value={form.password}
          onChangeText={(value) =>
            changeFormValues({ password: value, passwordError: false })
          }
          placeholder='Пароль'
          autoCorrect={false}
          autoCapitalize={'none'}
        />

        <TextInput
          style={[styles.input, form.confirmError && styles.inputError]}
          value={form.confirmPassword}
          onChangeText={(value) =>
            changeFormValues({ confirmPassword: value, passwordError: false })
          }
          placeholder='Повторите пароль'
          autoCorrect={false}
          autoCapitalize={'none'}
        />

        <StyledButton
          title='Сохранить'
          onPress={changePasswordHandler}
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
    backgroundColor: '#3e1570',
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
    backgroundColor: '#f5ab23',
    marginVertical: 30,
    borderRadius: 10,
    fontSize: 24,
    fontFamily: 'roboto',
  },
});
