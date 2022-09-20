import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppButton } from '../../../components/buttons/AppButton';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { TypeTrainingDay } from '../../../context/trainingProgram/types';
import { GET_PROGRAM_BY_ID } from '../../../graphql/programs/programQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { createMuscleGroupsDescription } from '../../trainingPrograms/CreateProgramScreen/helpers';
import { transformProgramData } from './helpers';
import {
  TypeScreenProps,
  TypeActiveProgramData,
  TypeTransformedProgramData,
} from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function ChooseWorkoutDayScreen({
  navigation,
}: TypeScreenProps) {
  const { data, loading, error, refetch } = useQuery<
    {
      getProgramById: TypeActiveProgramData;
    },
    { programId: string }
  >(GET_PROGRAM_BY_ID, {
    variables: { programId: '82fd88bb-92c0-4ec9-aa3d-a48d2cc0c766' },
  });

  const [program, setProgram] = useState<TypeTransformedProgramData | null>(
    null
  );

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  // handlers --------

  const cardPressHandler = (dayId: string, dayName: string): void => {
    console.log('dayId---', dayId);
    console.log('dayName---', dayName);

    // ! Создаем в контекст стейте сущность тренировки

    navigation.navigate(PageTypes.CHOOSE_EXERCISE_AND_START, {
      dayId,
      dayName,
    });
  };

  // useEffect --------

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformProgramData(data.getProgramById);
      setProgram(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert(
        'Ошибка',
        'Не удалось загрузить программу, попробуйте зайти на страницу позже'
      );
    }
  }, [loading]);

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [])
  // );

  const renderItem = ({ item }: { item: TypeTrainingDay }) => {
    return (
      <SimpleCard
        title={item.name}
        description={createMuscleGroupsDescription(item)}
        onPress={() => cardPressHandler(item.id, item.name)}
      />
    );
  };

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title={program?.name ?? ''}
        onPressLeftButton={() => navigation.goBack()}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Выбрать программу'
          onPress={() => navigation.navigate(PageTypes.ALL_PROGRAMS)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={program?.days ?? []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />
    </MainLayout>
  );
}
