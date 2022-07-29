import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { GET_PROGRAM_DESCRIPTION_BY_ID } from '../../../graphql/programs/programQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { transformProgramDetailData } from './helpers';
import {
  TypeProgramDetailData,
  TypeScreenProps,
  TypeTransformedProgramData,
} from './types';
import { Article } from '../../../components/typography/Article';
import { TypeArticleSection } from '../../../common/types';
import { programImages } from '../../../images/programs';
import { AppText } from '../../../components/typography/AppText';

export default function ProgramDetailScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { programId } = route.params;

  const { data, loading, error } = useQuery<{
    getProgramById: TypeProgramDetailData;
  }>(GET_PROGRAM_DESCRIPTION_BY_ID, { variables: { programId } });

  const [program, setProgram] = useState<TypeTransformedProgramData | null>(
    null
  );

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  useEffect(() => {
    if (!loading && data) {
      const transformedData = transformProgramDetailData(data.getProgramById);
      setProgram(transformedData);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && error) {
      Alert.alert('Ошибка', 'Не удалось загрузить описание программы');
    }
  }, [loading]);

  console.log('SERVER DATA PROGRAM DETAIL DESCRIPTION', program);

  const articleSections: TypeArticleSection[] = [
    {
      title: 'Заголовок',
      subTitle: 'Подзаголовок',
      text: 'Банальные, но неопровержимые выводы, а также акционеры крупнейших компаний заблокированы в рамках своих собственных рациональных ограничений. Как принято считать, ключевые особенности структуры проекта набирают популярность среди определенных слоев населения, а значит, должны быть своевременно верифицированы.',
    },
    {
      title: null,
      subTitle: null,
      text: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что ключевые особенности структуры проекта набирают популярность среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых факторов. Безусловно, сплочённость команды профессионалов выявляет срочную потребность новых принципов формирования материально-технической и кадровой базы. Следует отметить, что синтетическое тестирование создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса соответствующих условий активизации.',
    },
  ];

  // // ! не понадобится, так как мы уже трансформировали данные с сервера ранее
  // const carouselImagesData: ImageSourcePropType[] = [
  //   programImages.programDescriptionImages['p-1-content-img-1'],
  // ];

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title={program?.name ?? ''}
        onPressLeftButton={() => navigation.goBack()}
      />

      {program ? (
        // <Article content={articleSections} images={carouselImagesData} />
        <Article content={articleSections} images={program.descriptionImages} />
      ) : (
        <AppText
          size='24px'
          lineHeight='30px'
          fontWeight='medium'
          color='#ffffff'
          textAlign='center'
        >
          Программа не найдена
        </AppText>
      )}
    </MainLayout>
  );
}
