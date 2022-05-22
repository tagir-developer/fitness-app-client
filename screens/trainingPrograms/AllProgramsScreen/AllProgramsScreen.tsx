import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Alert } from 'react-native';
import { AppButton } from '../../../components/buttons/AppButton';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { TypeHomeScreenProps } from './types';

export default function AllProgramsScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const [sourcesLoading, setSourcesLoading] = useState(true);

  const createProgrammHandler = (): void => {
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

  // const loadEndHandler = (): void => {
  //   console.log('Конец загрузки картинок');
  //   setSourcesLoading(false);
  // };

  // if (loading) return <StyledText>Loading...</StyledText>;

  // if (sourcesLoading) return <StyledText>Загрузка...</StyledText>;

  return (
    <MainLayout>
      <AppHeader
        title='Программы тренировок'
        onPressLeftButton={() => navigation.goBack()}
        // leftButton={<HeaderButton onPress={() => console.log('Нажали!!!')} />}
      />

      <AppFlex flex='1' justify='flex-start'>
        <AppButton
          title='Создать свою программу'
          onPress={createProgrammHandler}
          fontSize='17px'
          mb='30px'
          // mt='30px'
        />

        <AppButton
          title='Создать свою программу'
          onPress={createProgrammHandler}
          fontSize='17px'
          mb='30px'
        />

        {/* <AppFlex flex='1'>
          <AppFlex h='200px'>
            <AppButton
              title='Создать свою программу'
              onPress={createProgrammHandler}
              fontSize='17px'
              mb='30px'
            />
          </AppFlex>

          <HomeMenu>
            <HomeMenuItem
              title='Программы'
              onPress={() => console.log('sdsdsd')}
            />
            <HomeMenuItem
              title='Настройки'
              onPress={() => console.log('sdsdsd')}
            />
          </HomeMenu>
        </AppFlex> */}
      </AppFlex>
    </MainLayout>
  );
}
