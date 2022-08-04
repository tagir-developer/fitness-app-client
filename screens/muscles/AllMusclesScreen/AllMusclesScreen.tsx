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
import { transformDataToListFormat } from './helpers';
import {
  TypeMuscleData,
  TypeScreenProps,
  TypeTransformedMuscleData,
} from './types';

import { AppFlex } from '../../../components/ui/AppFlex';
import { EmptyList } from '../../../components/ui/EmptyList';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { GET_ALL_MUSCLES } from '../../../graphql/muscles/musclesQuery';
import { AppSearchInput } from '../../../components/formControls/AppSearchInput';
import { FlatlistTopDivider } from '../../../components/common/FlatlistTopDivider';
import { useDebounce } from '../../../common/hooks/useDebounce';
import { AppText } from '../../../components/typography/AppText';

const LIST_BOTTOM_SPACE = 150;

export default function AllMusclesScreen({ navigation }: TypeScreenProps) {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, SEARCH_INPUT_DELAY);

  const { data, loading, error, refetch } = useQuery<{
    getAllMuscles: TypeMuscleData[];
  }>(GET_ALL_MUSCLES, { variables: { searchText: '' } });

  const [muscles, setMuscles] = useState<TypeTransformedMuscleData[]>([]);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformDataToListFormat(data.getAllMuscles);
      setMuscles(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить список мышц');
    }
  }, [loading]);

  useEffect(() => {
    refetch({ searchText: debouncedSearchValue });
  }, [debouncedSearchValue]);

  // useEffect(() => {
  //   refetch({ searchText: searchValue });
  // }, [searchValue]);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader title='Мышцы' onPressLeftButton={() => navigation.goBack()} />

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
          data={muscles}
          renderItem={({ item }) => (
            <SimpleCard
              title={item.name}
              img={item.previewImage}
              onPress={() => console.log('Нажали на карточку', item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
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
