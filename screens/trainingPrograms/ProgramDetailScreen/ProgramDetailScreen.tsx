import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { AppButton } from '../../../components/buttons/AppButton';
import { CardWithImage } from '../../../components/cards/CardWithImage';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { GET_PROGRAM_DESCRIPTION_BY_ID } from '../../../graphql/programs/programQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import {
  PageTypes,
  TypeCreateExercisePageTypes,
} from '../../../navigation/types';
import { transformProgramDetailData } from './helpers';
import {
  TypeProgramDetailData,
  TypeScreenProps,
  TypeTransformedProgramData,
} from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

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

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title={program?.name ?? ''}
        onPressLeftButton={() => navigation.goBack()}
      />

      {program ? (
        <Text style={{ color: 'white' }}>{program.name}</Text>
      ) : (
        <Text style={{ color: 'white' }}>Программа не найдена</Text>
      )}

      {/* <AppFlex flex='1' justify='flex-start'>
        <FlatList
          style={{ width: '100%' }}
          data={programs}
          renderItem={({ item }) => (
            <CardWithImage
              title={item.name}
              isActive={item.isUserActiveProgram}
              onCheckHandler={async () =>
                await changeActiveProgramHandler(item.id)
              }
              imgSource={item.previewImage}
              onPress={
                item.isUserProgram
                  ? () =>
                      navigation.navigate(PageTypes.CREATE_PROGRAM, {
                        programId: item.id,
                        pageType: TypeCreateExercisePageTypes.EDIT,
                      })
                  : () =>
                      console.log(
                        'Открыть информацию о дефолтной программе',
                        item.id
                      )
              }
              deleteHandler={
                item.isUserProgram
                  ? async () => await deleteProgramHandler(item.id)
                  : undefined
              }
              copyHandler={
                item.isUserProgram
                  ? async () => await copyProgramHandler(item.id)
                  : undefined
              }
              editHandler={
                item.isUserProgram
                  ? async () => await openChangeProgramNameModal(item.id)
                  : undefined
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex> */}
    </MainLayout>
  );
}
