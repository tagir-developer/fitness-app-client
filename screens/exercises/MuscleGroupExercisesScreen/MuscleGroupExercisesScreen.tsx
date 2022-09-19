import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import {
  DEFAULT_SCREEN_SOURCES_COUNT,
  SEARCH_INPUT_DELAY,
} from '../../../common/constants';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { TypeScreenProps } from './types';

import { AppFlex } from '../../../components/ui/AppFlex';
import { EmptyList } from '../../../components/ui/EmptyList';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { AppSearchInput } from '../../../components/formControls/AppSearchInput';
import { FlatlistTopDivider } from '../../../components/common/FlatlistTopDivider';
import { useDebounce } from '../../../common/hooks/useDebounce';
import { PageTypes } from '../../../navigation/types';
import {
  GET_ALL_EXERCISES,
  GET_MUSCLE_GROUP_EXERCISES,
} from '../../../graphql/exercises/exerciseQuery';
import {
  TypeExerciseData,
  TypeTransformedExerciseData,
} from '../AllExercisesScreen/types';
import { transformExerciseDataToListFormat } from '../AllExercisesScreen/helpers';

const LIST_BOTTOM_SPACE = 150;

export default function MuscleGroupExercisesScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { muscleGroupId } = route.params;

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, SEARCH_INPUT_DELAY);

  console.log('muscleGroupId -------------', muscleGroupId);

  const { data, loading, error, refetch } = useQuery<{
    getExercisesByMuscleGroupId: TypeExerciseData[];
  }>(GET_MUSCLE_GROUP_EXERCISES, {
    variables: { muscleGroupId, searchText: '' },
  });

  const [exercises, setExercises] = useState<TypeTransformedExerciseData[]>([]);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      console.log('DATA -------------', data);
      const transformedData = transformExerciseDataToListFormat(
        data.getExercisesByMuscleGroupId
      );
      setExercises(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить список упражнений');
    }
  }, [loading]);

  useEffect(() => {
    refetch({ searchText: debouncedSearchValue });
  }, [debouncedSearchValue]);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title='Упражнения'
        onPressLeftButton={() => navigation.goBack()}
      />

      <AppSearchInput
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder='Поиск по названию'
        mt='135px'
        mb='25px'
      />

      <FlatlistTopDivider />

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={exercises}
          renderItem={({ item }) => (
            <SimpleCard
              title={item.name}
              img={item.previewImage}
              description={item.muscles}
              onPress={() =>
                navigation.navigate(PageTypes.EXERCISE_DETAIL, {
                  exerciseId: item.id,
                })
              }
            />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={<EmptyList message='Список пуст.' />}
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />
    </MainLayout>
  );
}
