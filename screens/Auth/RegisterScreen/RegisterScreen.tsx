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
import { useAuthContext } from '../../../context/authContext';
import { REGISTER_NEW_USER } from '../../../graphql/mutations/user';
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
  TypeRegisterValidationErrors,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StyledText style={styles.title}>Регистрация</StyledText>

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

        <TextInput
          style={[styles.input, form.passwordError && styles.inputError]}
          value={form.password}
          onChangeText={(value) =>
            changeFormValues({ password: value, passwordError: false })
          }
          placeholder='Введите пароль'
          autoCorrect={false}
          autoCapitalize={'none'}
        />

        <StyledButton
          title='Зарегистрировать'
          onPress={registerHandler}
          style={styles.button}
        />

        <View style={styles.divider} />

        <Button title='Войти' onPress={() => navigation.navigate('SignIn')} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102349',
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
    backgroundColor: '#259ab8',
    marginVertical: 30,
    borderRadius: 10,
    fontSize: 24,
    fontFamily: 'roboto',
  },
});
