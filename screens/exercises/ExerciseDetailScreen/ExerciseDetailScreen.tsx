import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import {
  TypeExerciseDetailData,
  TypeScreenProps,
  TypeTransformedExerciseDetailData,
} from './types';
import { Article } from '../../../components/typography/Article';
import { AppText } from '../../../components/typography/AppText';
import { AppFlex } from '../../../components/ui/AppFlex';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { transformExerciseDetailData } from './helpers';
import { GET_EXERCISE_DETAIL_DATA } from '../../../graphql/exercises/exerciseQuery';
import { PageTypes } from '../../../navigation/types';

export default function ExerciseDetailScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { exerciseId } = route.params;

  const { data, loading, error } = useQuery<{
    getExerciseData: TypeExerciseDetailData;
  }>(GET_EXERCISE_DETAIL_DATA, { variables: { exerciseId } });

  const [exerciseData, setExerciseData] =
    useState<TypeTransformedExerciseDetailData | null>(null);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformExerciseDetailData(data.getExerciseData);
      setExerciseData(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные упражнения');
    }
  }, [loading]);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title={exerciseData?.name ?? ''}
        onPressLeftButton={() => navigation.goBack()}
      />

      {exerciseData ? (
        <>
          <Article
            content={exerciseData.description}
            images={exerciseData.descriptionImages}
          >
            {exerciseData.similarExercises.length > 0 && (
              <AppFlex mt='30px' mb='30px' flex='1' align='stretch'>
                <AppText
                  size='24px'
                  lineHeight='30px'
                  fontWeight='medium'
                  color='#ffffff'
                  textAlign='left'
                  pHorizontal='20px'
                  mb='30px'
                >
                  Похожие упражнения
                </AppText>

                {exerciseData.similarExercises.map((item) => (
                  <SimpleCard
                    title={item.name}
                    img={item.previewImage}
                    onPress={() =>
                      navigation.navigate(PageTypes.EXERCISE_DETAIL, {
                        exerciseId: item.id,
                      })
                    }
                  />
                ))}
              </AppFlex>
            )}

            {exerciseData.primaryMuscles.length > 0 && (
              <AppFlex mt='30px' mb='30px' flex='1' align='stretch'>
                <AppText
                  size='24px'
                  lineHeight='30px'
                  fontWeight='medium'
                  color='#ffffff'
                  textAlign='left'
                  pHorizontal='20px'
                  mb='30px'
                >
                  Основные мышцы
                </AppText>

                {exerciseData.primaryMuscles.map((item) => (
                  <SimpleCard
                    title={item.name}
                    img={item.previewImage}
                    onPress={() =>
                      navigation.navigate(PageTypes.MUSCLE_DETAIL, {
                        muscleId: item.id,
                      })
                    }
                  />
                ))}
              </AppFlex>
            )}

            {exerciseData.secondaryMuscles.length > 0 && (
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
                  Вторичные мышцы
                </AppText>

                {exerciseData.secondaryMuscles.map((item) => (
                  <SimpleCard
                    title={item.name}
                    img={item.previewImage}
                    onPress={() =>
                      navigation.navigate(PageTypes.MUSCLE_DETAIL, {
                        muscleId: item.id,
                      })
                    }
                  />
                ))}
              </AppFlex>
            )}
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
          Упражнение не найдено
        </AppText>
      )}
    </MainLayout>
  );
}
