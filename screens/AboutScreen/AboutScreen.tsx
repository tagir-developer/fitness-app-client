import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { StyledButton } from '../../components/ui/StyledButton';
import { StyledText } from '../../components/ui/StyledText';
import { useAuthContext } from '../../context/authContext';
import { GET_ALL_USERS, GET_USER_BY_EMAIL } from '../../graphql/query/user';
import { TypeAboutScreenProps } from './types';

export default function AboutScreen({ navigation }: TypeAboutScreenProps) {
  const { handleChangeLoginState } = useAuthContext();

  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: 'marsel@mail.ru' },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      handleChangeLoginState(false);
    }
  }, [error, handleChangeLoginState]);

  if (loading) return <StyledText>Загрузка...</StyledText>;

  if (error) {
    // console.log('ОБЪЕКТ ОШИБКИ ===== error', error);
    // console.log(
    //   'ОБЪЕКТ ОШИБКИ ====== error.graphQLErrors',
    //   JSON.stringify(error.graphQLErrors)
    // );
    // console.log('ОБЪЕКТ ОШИБКИ ====== error.clientErrors', error.clientErrors);

    // if (error.message === 'Unauthorized') {
    //   handleChangeLoginState(false);
    // }

    if (error.message === 'Unauthorized') {
      Alert.alert('Ошибка', 'Пользователь не авторизован');
    } else {
      Alert.alert(
        'Ошибка',
        'Не удалось получить пользователя ' + error.message
      );
    }
  }

  console.log('data - данные пользователя', data?.getUser);

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Второй экран</StyledText>
      <Button onPress={() => navigation.navigate('Home')} title='На главную' />

      <View style={styles.user}>
        <StyledText style={styles.text}>
          {data?.getUser?.id ?? 'Не указано'}
        </StyledText>
        <StyledText style={styles.text}>
          {data?.getUser?.email ?? 'Не указано'}
        </StyledText>
        <StyledText style={styles.text}>
          {data?.getUser?.userName ?? 'Без имени'}
        </StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  user: {
    marginVertical: 30,
    height: 300,
    width: '80%',
    backgroundColor: '#201d81',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
