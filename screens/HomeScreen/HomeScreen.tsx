import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StyledText } from '../../components/ui/StyledText';
import { GET_ALL_USERS } from '../../graphql/query/user';

export default function HomeScreen() {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const { data, loading, error } = useQuery(GET_ALL_USERS);

  console.log('Полученные пользователи', data);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const getAllUsers = () => {
    console.log('CLICK');
  };

  if (loading) return <StyledText>Loading...</StyledText>;

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Второй экран</StyledText>
      <Button onPress={getAllUsers} title='Получить пользователей' />

      <View style={styles.users}>
        {users.map((user, index) => {
          return (
            <View style={styles.userInfo} key={index}>
              <StyledText>{user.email}</StyledText>
            </View>
          );
        })}
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
  users: {
    marginVertical: 30,
    height: 600,
    width: '80%',
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userInfo: {
    marginVertical: 10,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
  },
});
