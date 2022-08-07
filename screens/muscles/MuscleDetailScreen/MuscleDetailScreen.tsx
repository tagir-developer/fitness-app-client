import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { transformProgramDetailData } from './helpers';
import {
  TypeMuscleDetailData,
  TypeScreenProps,
  TypeTransformedMuscleData,
} from './types';
import { Article } from '../../../components/typography/Article';
import { AppText } from '../../../components/typography/AppText';
import { AppFlex } from '../../../components/ui/AppFlex';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { GET_MUSCLE_DETAIL_DATA } from '../../../graphql/muscles/musclesQuery';

export default function MuscleDetailScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { muscleId } = route.params;

  const { data, loading, error } = useQuery<{
    getMuscleData: TypeMuscleDetailData;
  }>(GET_MUSCLE_DETAIL_DATA, { variables: { muscleId } });

  const [muscleData, setMuscleData] =
    useState<TypeTransformedMuscleData | null>(null);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformProgramDetailData(data.getMuscleData);
      setMuscleData(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные мышцы');
    }
  }, [loading]);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title={muscleData?.name ?? ''}
        onPressLeftButton={() => navigation.goBack()}
      />

      {muscleData ? (
        <>
          <Article
            content={muscleData.description}
            images={muscleData.descriptionImages}
          >
            <AppFlex mt='30px' mb='80px' flex='1' align='stretch'>
              <AppText
                size='24px'
                lineHeight='30px'
                fontWeight='medium'
                color='#ffffff'
                textAlign='left'
                pHorizontal='20px'
                mb='30px'
              >
                Упражнения
              </AppText>

              {muscleData.exercises.map((item) => (
                <SimpleCard
                  title={item.name}
                  img={item.previewImage}
                  // onPress={() =>
                  //   navigation.navigate(PageTypes.MUSCLE_DETAIL, {
                  //     muscleId: item.id,
                  //   })
                  // }
                />
              ))}
            </AppFlex>
          </Article>
        </>
      ) : (
        <AppText
          size='24px'
          lineHeight='30px'
          fontWeight='medium'
          color='#ffffff'
          textAlign='center'
        >
          Мышца не найдена
        </AppText>
      )}
    </MainLayout>
  );
}
