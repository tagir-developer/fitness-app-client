import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { v4 } from 'uuid';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { InfoCard } from '../../../components/cards/InfoCard';
import { FlatlistTopDivider } from '../../../components/common/FlatlistTopDivider';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppSearchInput } from '../../../components/formControls/AppSearchInput';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { useProgramContext } from '../../../context/trainingProgram/programContext';
import { TypeExercise } from '../../../context/trainingProgram/types';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeChooseExerciseForProgram, TypeExerciseListItem } from './types';

const LIST_BOTTOM_SPACE = 150;

export default function ChooseExerciseForNewProgram({
  navigation,
}: TypeChooseExerciseForProgram) {
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);

  const { activeDay, addExerciseToDay, setActiveDay } = useProgramContext();

  const loading = useGetSourcesLoadingState(DEFAULT_SCREEN_SOURCES_COUNT);

  // ! Загружаем список упражнений с сервера
  const exercises: TypeExerciseListItem[] = [
    {
      id: '1',
      name: 'Жим лежа',
      muscleGroups: ['Грудь', 'Трицепс'],
    },
    {
      id: '2',
      name: 'Приседания',
      muscleGroups: ['Ноги', 'Ягодицы', 'Голени'],
    },
    {
      id: '3',
      name: 'Подтягивания',
      muscleGroups: ['Спина', 'Бицепс', 'Предплечия'],
    },
  ];

  if (!activeDay) return null;

  const cardPressHandler = (exercise: TypeExerciseListItem) => {
    const dayExercise: TypeExercise = {
      id: v4(),
      exerciseId: exercise.id,
      name: exercise.name,
      muscleGroups: exercise.muscleGroups,
    };
    addExerciseToDay(activeDay.id, dayExercise);
    navigation.goBack();
  };

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
          renderItem={({ item: exercise }) => (
            <InfoCard
              title={exercise.name}
              description={exercise.muscleGroups.join(', ')}
              onPress={() => cardPressHandler(exercise)}
              infoPressHandler={() => console.log('Нажали инфо', exercise.id)}
              disableSwipeoutButtons={true}
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
