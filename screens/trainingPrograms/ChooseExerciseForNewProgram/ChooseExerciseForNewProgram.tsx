import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
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
import { GET_ALL_EXERCISES } from '../../../graphql/exercises/exerciseQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { transformExercisesDataToListFormat } from './helpers';
import { TypeChooseExerciseForProgram, TypeExerciseListItem } from './types';

const LIST_BOTTOM_SPACE = 150;

export default function ChooseExerciseForNewProgram({
  navigation,
}: TypeChooseExerciseForProgram) {
  const [exercises, setExercises] = useState<TypeExerciseListItem[]>([]);

  const { activeDay, addExerciseToDay } = useProgramContext();

  const { data, loading, error } = useQuery<{
    getAllExercises: Omit<TypeExerciseListItem, 'muscleGroups'>[];
  }>(GET_ALL_EXERCISES);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

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

  useEffect(() => {
    if (!loading && data) {
      // ! TODO: Временный хэлпер, пока нету muscle groups
      const transformedData = transformExercisesDataToListFormat(
        data.getAllExercises
      );
      setExercises(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить упражнения.');
    }
  }, [loading]);

  return (
    <MainLayout loading={sourcesLoading}>
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
              description={exercise.muscleGroups}
              onPress={() => cardPressHandler(exercise)}
              infoPressHandler={() =>
                console.log('Переходим в детальку упражнения', exercise.id)
              }
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
