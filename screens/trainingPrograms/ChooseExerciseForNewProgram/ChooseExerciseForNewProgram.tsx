import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { InfoCard } from '../../../components/cards/InfoCard';
import { FlatlistTopDivider } from '../../../components/common/FlatlistTopDivider';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppSearchInput } from '../../../components/formControls/AppSearchInput';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { TypeChooseExerciseForProgram, TypeExercises } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function ChooseExerciseForNewProgram({
  navigation,
}: TypeChooseExerciseForProgram) {
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  const [activeCardId, setActiveCardId] = useState('');

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  const exercises: TypeExercises[] = [
    {
      id: '1',
      title: 'Жим лежа',
      muscleGroups: [
        { id: '1', name: 'Бицепс' },
        { id: '2', name: 'Трицепс' },
      ],
    },
    {
      id: '2',
      title: 'Приседания',
      muscleGroups: [
        { id: '1', name: 'Ноги' },
        { id: '2', name: 'Грудь' },
        { id: '2', name: 'Плечи' },
      ],
    },
    {
      id: '3',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '4',
      title: 'Жим штанги на скамье с наклоном вверх',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '5',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '6',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '7',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '8',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '9',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
    {
      id: '10',
      title: 'Подтягивания',
      muscleGroups: [{ id: '1', name: 'Ноги' }],
    },
  ];

  return (
    <MainLayout loading={loading}>
      <AppHeader
        title='Выберите упражнение'
        onPressLeftButton={() => navigation.goBack()}
      />

      <AppFlex flex='1' justify='flex-start'>
        <AppSearchInput placeholder='Поиск по названию' mt='135px' mb='25px' />

        <FlatlistTopDivider />

        <FlatList
          style={{ width: '100%' }}
          data={exercises}
          renderItem={({ item }) => (
            <InfoCard
              title={item.title}
              description={item.muscleGroups.map((i) => i.name).join(', ')}
              onPress={() => {
                console.log('Нажали на карточку', item.id);
                setActiveCardId(item.id);
              }}
              deleteHandler={() => console.log('Удалить карточку', item.id)}
              copyHandler={() => console.log('Скопировать карточку', item.id)}
              infoPressHandler={() => console.log('Нажали инфо', item.id)}
              disableSwipeoutButtons={true}
              isActive={activeCardId === item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={
            <EmptyList message='Нет упражнений. Добавьте первое упражнение.' />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />
    </MainLayout>
  );
}
