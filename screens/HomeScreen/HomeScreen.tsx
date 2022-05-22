import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AppButton } from '../../components/buttons/AppButton';
import { AppFlex } from '../../components/ui/AppFlex';
import { HomeMenu } from '../../components/ui/HomeMenu';
import { HomeMenuItem } from '../../components/ui/HomeMenuItem';
import MainLayout from '../../components/ui/MainLayout';
import { useAuthContext } from '../../context/authContext';
import { GET_ALL_USERS } from '../../graphql/query/user';
import { PageTypes } from '../../navigation/types';
import { TypeHomeScreenProps } from './types';

export default function HomeScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const { handleChangeLoginState } = useAuthContext();

  // есть ли продолжающаяся тренировка
  const isActiveWorkout = false;

  // ! Этот функционал по выходу из системы добавить на страницу настроек

  // const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
  //   notifyOnNetworkStatusChange: true,
  // });

  // useEffect(() => {
  //   if (!loading) {
  //     setUsers(data.getAllUsers);
  //   }
  // }, [data]);

  // const getAllUsers = () => {
  //   console.log('CLICK');
  //   refetch();
  // };

  const completeWorkoutHandler = (): void => {
    Alert.alert(
      'Закончить тренировку',
      'Вы действительно хотите закончить тренировку?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Отмена действия закончить тренировку'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('Подтверждение закончить тренировку'),
        },
      ]
    );
  };

  const handleLogout = (): void => {
    handleChangeLoginState(false);
  };

  // if (loading) return <StyledText>Loading...</StyledText>;

  return (
    <MainLayout>
      <AppFlex flex='1'>
        <AppFlex flex='1'>
          <AppFlex h='200px'>
            {isActiveWorkout ? (
              <>
                <AppButton
                  title='Продолжить тренировку'
                  subTitle='Базовая программа'
                  onPress={() => {}}
                  mb='25px'
                  fontSize='17px'
                />

                <AppButton
                  title='Закончить тренировку'
                  onPress={completeWorkoutHandler}
                  fontSize='17px'
                  mb='30px'
                />
              </>
            ) : (
              <AppButton
                title='Начать тренировку'
                subTitle='Базовая программа'
                onPress={() => {}}
                mb='25px'
                fontSize='17px'
              />
            )}
          </AppFlex>

          <HomeMenu>
            <HomeMenuItem
              title='Программы'
              onPress={() => navigation.navigate(PageTypes.ALL_PROGRAMS)}
            />
            <HomeMenuItem
              title='История тренировок'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Упражнения'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Мышечные группы'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Состояние тела'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Статистика'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Калькулятор'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Настройки'
              onPress={() => console.log('sdsdsd')}
            />
          </HomeMenu>
        </AppFlex>

        {/* <StyledButton title='Выйти' onPress={handleLogout} /> */}
      </AppFlex>
    </MainLayout>
  );
}
