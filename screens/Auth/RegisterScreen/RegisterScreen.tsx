import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { StyledText } from '../../../components/ui/StyledText';
import { REGISTER_NEW_USER } from '../../../graphql/mutations/user';
import { TypeRegisterScreenProps } from './types';

export default function RegisterScreen({
  navigation,
}: TypeRegisterScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_NEW_USER);

  const registerHandler = () => {
    console.log('Регистрация', email, password);

    registerUser({
      variables: { user: { email, password } },
    }).then(({ data }) => {
      console.log('После регистрации', data);
      setEmail('');
      setPassword('');
    });
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Регистрация</StyledText>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='Введите email'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Введите пароль'
      />
      <Button title='Зарегистрировать' onPress={registerHandler} />
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
  divider: {
    width: '80%',
    marginVertical: 30,
    height: 2,
    backgroundColor: 'grey',
  },
});
