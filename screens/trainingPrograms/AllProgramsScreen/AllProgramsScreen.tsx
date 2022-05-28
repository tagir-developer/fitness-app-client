import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import GearIcon from '../../../common/icons/gearIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { CardWithImage } from '../../../components/cards/CardWithImage';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { TypeHomeScreenProps } from './types';

const LIST_TOP_SPACE = '250px';
const LIST_BOTTOM_SPACE = '150px';

export default function AllProgramsScreen({ navigation }: TypeHomeScreenProps) {
  const [users, setUsers] = useState<{ email: string }[]>([]);

  const [activeProgramId, setActiveProgramId] = useState<string | null>('1');

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

  const programs = [
    { id: '1', title: 'Базовая программа' },
    { id: '2', title: 'Мощные ноги' },
    { id: '3', title: 'Чудовищный пресс' },
    { id: '4', title: 'Чудовищный пресс' },
    { id: '5', title: 'Чудовищный пресс' },
    { id: '6', title: 'Чудовищный пресс' },
    { id: '7', title: 'Чудовищный пресс' },
    { id: '8', title: 'Чудовищный пресс' },
    { id: '9', title: 'Чудовищный пресс' },
    { id: '10', title: 'Чудовищный пресс' },
    { id: '11', title: 'Чудовищный пресс' },
    { id: '12', title: 'Чудовищный пресс' },
  ];

  console.log('active program id', activeProgramId);

  return (
    <MainLayout>
      <AppHeader
        title='Программы тренировок'
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<GearIcon />}
        onPressRightButton={() => {}}
      />

      <OpacityDarkness top='0px' h={LIST_TOP_SPACE} reverse={true}>
        <AppButton
          title='Создать свою программу'
          onPress={createProgrammHandler}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={programs}
          renderItem={({ item }) => (
            <CardWithImage
              title={item.title}
              isActive={item.id === activeProgramId}
              onCheckHandler={() => setActiveProgramId(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ width: '100%', height: parseInt(LIST_TOP_SPACE) }} />
          }
          ListFooterComponent={
            <View
              style={{ width: '100%', height: parseInt(LIST_BOTTOM_SPACE) }}
            />
          }
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={LIST_BOTTOM_SPACE} />
    </MainLayout>
  );
}
