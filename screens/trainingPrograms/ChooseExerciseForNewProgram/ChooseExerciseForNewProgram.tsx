import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { v4 } from 'uuid';
import {
  DEFAULT_SCREEN_SOURCES_COUNT,
  SEARCH_INPUT_DELAY,
} from '../../../common/constants';
import { useDebounce } from '../../../common/hooks/useDebounce';
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
import { transformExerciseDataToListFormat } from '../../exercises/AllExercisesScreen/helpers';
import {
  TypeExerciseData,
  TypeTransformedExerciseData,
} from '../../exercises/AllExercisesScreen/types';
import { TypeChooseExerciseForProgram } from './types';

const LIST_BOTTOM_SPACE = 150;

export default function ChooseExerciseForNewProgram({
  navigation,
}: TypeChooseExerciseForProgram) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, SEARCH_INPUT_DELAY);

  const [exercises, setExercises] = useState<TypeTransformedExerciseData[]>([]);

  const { activeDay, addExerciseToDay } = useProgramContext();

  const { data, loading, error, refetch } = useQuery<{
    getAllExercises: TypeExerciseData[];
  }>(GET_ALL_EXERCISES, { variables: { searchText: '' } });

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  if (!activeDay) return null;

  const cardPressHandler = (exercise: TypeTransformedExerciseData) => {
    const dayExercise: TypeExercise = {
      id: v4(),
      exerciseId: exercise.id,
      name: exercise.name,
      muscleGroups: exercise.muscles,
    };

    addExerciseToDay(activeDay.id, dayExercise);

    navigation.goBack();
  };

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformExerciseDataToListFormat(
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

  useEffect(() => {
    refetch({ searchText: debouncedSearchValue });
  }, [debouncedSearchValue]);

  return (
    <MainLayout loading={sourcesLoading}>
      <AppHeader
        title='Выберите упражнение'
        onPressLeftButton={() => navigation.goBack()}
      />

      <AppFlex flex='1' justify='flex-start'>
        <AppSearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder='Поиск по названию'
          mt='135px'
          mb='25px'
        />

        <FlatlistTopDivider />

        <FlatList
          style={{ width: '100%' }}
          data={exercises}
          renderItem={({ item: exercise }) => (
            <InfoCard
              title={exercise.name}
              description={exercise.muscles}
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
