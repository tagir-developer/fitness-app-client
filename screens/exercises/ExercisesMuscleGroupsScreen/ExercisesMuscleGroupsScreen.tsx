import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { transformDataToListFormat } from './helpers';
import {
  TypeMuscleGroupData,
  TypeScreenProps,
  TypeTransformedMuscleGroupData,
} from './types';

import { AppFlex } from '../../../components/ui/AppFlex';
import { EmptyList } from '../../../components/ui/EmptyList';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { GET_MUSCLE_GROUPS } from '../../../graphql/muscles/musclesQuery';
import { musclesImages } from '../../../images/muscles';
import { PageTypes } from '../../../navigation/types';

const LIST_BOTTOM_SPACE = 150;

export default function ExercisesMuscleGroupsScreen({
  navigation,
}: TypeScreenProps) {
  const { data, loading, error } = useQuery<{
    getMuscleGroups: TypeMuscleGroupData[];
  }>(GET_MUSCLE_GROUPS);

  const [muscleGroups, setMuscleGroups] = useState<
    TypeTransformedMuscleGroupData[]
  >([]);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformDataToListFormat(data.getMuscleGroups);
      setMuscleGroups(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить мышечные группы');
    }
  }, [loading]);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title='Упражнения'
        onPressLeftButton={() => navigation.goBack()}
      />

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%', marginTop: 135 }}
          data={muscleGroups}
          renderItem={({ item }) => (
            <SimpleCard
              title={item.name}
              img={item.previewImage}
              onPress={() =>
                navigation.navigate(PageTypes.MUSCLE_GROUP_EXERCISES, {
                  muscleGroupId: item.id,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <SimpleCard
              title='Все упражнения'
              img={musclesImages.cardPreviewImages.muscleGroups.allGroups}
              onPress={() => navigation.navigate(PageTypes.ALL_EXERCISES)}
            />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={<EmptyList message='Нет мышечных групп' />}
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />
    </MainLayout>
  );
}
