import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { StyledButton } from '../../../components/ui/StyledButton';
import { StyledText } from '../../../components/ui/StyledText';
import { REGISTER_NEW_USER } from '../../../graphql/mutations/user';
import {
  TypeRegisteredUserData,
  TypeRegisterFormUpdateValues,
  TypeRegisterScreenProps,
  TypeRegisterValidationErrors,
} from './types';

export default function RegisterScreen({
  navigation,
}: TypeRegisterScreenProps) {
  const [form, setForm] = useState({
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
  });

  const [registerUser] = useMutation(REGISTER_NEW_USER);

  // const handleInputChange = (
  //   fieldName: string,
  //   value: string | boolean
  // ): void => {
  //   const newFormData = {
  //     ...form,
  //     [fieldName]: value,
  //   };

  //   setForm(newFormData);
  // };

  const changeFormValues = (values: TypeRegisterFormUpdateValues): void => {
    const newFormData = {
      ...form,
      ...values,
    };

    setForm(newFormData);
  };

  const registerHandler = () => {
    // validate form values
    const { email, password } = form;

    let errors: TypeRegisterValidationErrors = [];

    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    if (email.length === 0 || !emailRegExp.test(email)) {
      errors.push('emailError');
    }

    if (password.length < 5) {
      errors.push('passwordError');
    }

    if (errors.length > 0) {
      const values: TypeRegisterFormUpdateValues = {};

      errors.forEach((value) => {
        values[value] = true;
      });

      changeFormValues(values);

      return;
    }

    // send graphql request
    registerUser({
      variables: { user: { email, password } },
    })
      .then(({ data }) => {
        // ! Надо будет занести в глобальный стейт, вызвав обработчик handleChangeLoginState
        const userData: TypeRegisteredUserData = data.register;

        // handleChangeLoginState(true, userData.accessToken)

        setForm({
          ...form,
          email: '',
          password: '',
        });
      })
      .catch((e) => {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        if (errorMessage.toLowerCase().includes('email')) {
          errors.push('emailError');
        }

        if (errorMessage.toLowerCase().includes('пароль')) {
          errors.push('passwordError');
        }

        // ? Этот код повторяется, надо зарефачить
        if (errors.length > 0) {
          const values: TypeRegisterFormUpdateValues = {};

          errors.forEach((value) => {
            values[value] = true;
          });

          changeFormValues(values);
        }
      });
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Регистрация</StyledText>

      <TextInput
        style={[styles.input, form.emailError && styles.inputError]}
        value={form.email}
        onChangeText={(value) =>
          changeFormValues({ email: value, emailError: false })
        }
        placeholder='Введите email'
      />

      <TextInput
        style={[styles.input, form.passwordError && styles.inputError]}
        value={form.password}
        onChangeText={(value) =>
          changeFormValues({ password: value, passwordError: false })
        }
        placeholder='Введите пароль'
      />

      {/* <Button title='Зарегистрировать' onPress={registerHandler} /> */}
      <StyledButton
        title='Зарегистрировать'
        onPress={registerHandler}
        style={styles.button}
      />

      <View style={styles.divider} />

      <Button title='Войти' onPress={() => navigation.navigate('SignIn')} />
    </View>
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
    fontSize: 24,
    paddingHorizontal: 15,
    lineHeight: 50,
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
