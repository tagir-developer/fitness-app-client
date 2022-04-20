import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StyledButton } from '../../components/ui/StyledButton';
import { StyledText } from '../../components/ui/StyledText';
import { useAuthContext } from '../../context/authContext';
import { GET_ALL_USERS } from '../../graphql/query/user';
import { TypeHomeScreenProps } from './types';

export default function HomeScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const { handleChangeLoginState } = useAuthContext();

  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log('USE EFFECT +++++');
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const getAllUsers = () => {
    console.log('CLICK');
    refetch();
  };

  const handleLogout = (): void => {
    handleChangeLoginState(false);
  };

  if (loading) return <StyledText>Loading...</StyledText>;

  console.log('ПОЛЬЗОВАТЕЛИ =====', data);

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Второй экран</StyledText>
      <Button onPress={getAllUsers} title='Получить пользователей' />

      <Button
        onPress={() => navigation.navigate('About')}
        title='О приложении'
      />

      <View style={styles.users}>
        {users.map((user: any, index: any) => {
          return (
            <View style={styles.userInfo} key={index}>
              <StyledText>{user.email}</StyledText>
            </View>
          );
        })}
      </View>

      <StyledButton title='Выйти' onPress={handleLogout} />
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
  users: {
    marginVertical: 30,
    height: 300,
    width: '80%',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userInfo: {
    marginVertical: 10,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
  },
});
