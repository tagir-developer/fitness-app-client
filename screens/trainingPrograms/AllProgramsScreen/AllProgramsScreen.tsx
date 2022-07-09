import { useMutation, useQuery } from '@apollo/client';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, ImageSourcePropType, Text, View } from 'react-native';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import GearIcon from '../../../common/icons/gearIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { CardWithImage } from '../../../components/cards/CardWithImage';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import MainLayout from '../../../components/ui/MainLayout';
import { useProgramContext } from '../../../context/trainingProgram/programContext';
import {
  DELETE_PROGRAM,
  RENAME_PROGRAM,
} from '../../../graphql/programs/programMutations';
import { GET_ALL_USER_PROGRAMS } from '../../../graphql/programs/programQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { transformDataToListFormat } from './helpers';
import {
  TypeHomeScreenProps,
  TypeProgramData,
  TypeTransformedProgramData,
} from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AllProgramsScreen({ navigation }: TypeHomeScreenProps) {
  const [programs, setPrograms] = useState<TypeTransformedProgramData[]>([]);

  const { data, loading, error, refetch } = useQuery<{
    getAllUserPrograms: TypeProgramData[];
  }>(GET_ALL_USER_PROGRAMS);

  const [deleteProgram] = useMutation(DELETE_PROGRAM);
  const [renameProgram] = useMutation(RENAME_PROGRAM);

  const [activeProgramId, setActiveProgramId] = useState<string | null>('1');
  const [programName, setProgramName] = useState('');

  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);
  const [isRenameProgramModalOpen, setIsRenameProgramModalOpen] =
    useState(false);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const { setNewProgramData } = useProgramContext();

  const addProgram = (): void => {
    if (!programName.length) {
      return Alert.alert('Ошибка', 'Введите название программы');
    }
    setNewProgramData(programName);

    setIsAddProgramModalOpen(false);
    setProgramName('');

    navigation.navigate(PageTypes.CREATE_PROGRAM, { programName });
  };

  const cancelAddProgram = (): void => {
    setIsAddProgramModalOpen(false);
    setProgramName('');
  };

  const cancelRenameProgram = (): void => {
    setIsRenameProgramModalOpen(false);
    setProgramName('');
  };

  useEffect(() => {
    if (!loading && data) {
      console.log('SET SERVER DATA');
      const transformedData = transformDataToListFormat(
        data.getAllUserPrograms
      );
      setPrograms(transformedData);
    }
  }, [data]);

  const deleteProgramHandler = async (programId: string): Promise<void> => {
    try {
      const resultMessage: string = await deleteProgram({
        variables: {
          programId,
        },
      }).then(({ data: result }) => result.deleteProgram);

      console.log('resultMessage на удаление', resultMessage);

      Alert.alert('Успешное удаление', resultMessage);

      setPrograms((prev) => prev.filter((program) => program.id !== programId));
    } catch (e) {
      const errorMessage: string =
        e?.networkError?.result?.errors?.[0]?.message ?? '';

      Alert.alert('Ошибка удаления программы', errorMessage);
    }
  };

  const renameProgramHandler = async (
    programId: string | null,
    name: string
  ): Promise<void> => {
    if (!programId) return;
    if (!name) {
      return Alert.alert(
        'Ошибка валидации',
        'Имя программы не может быть пустым'
      );
    }

    try {
      const changedProgram: TypeTransformedProgramData = await renameProgram({
        variables: {
          programId,
          name,
        },
      }).then(({ data: result }) => result.changeProgramName);

      console.log('changedProgram+++++', changedProgram);

      Alert.alert('Успешная операция', 'Имя программы успешно изменено');

      setPrograms((prev) =>
        prev.map((program) => {
          if (program.id === programId) {
            return {
              ...program,
              name: changedProgram.name,
            };
          }
          return program;
        })
      );
    } catch (e) {
      const errorMessage: string =
        e?.networkError?.result?.errors?.[0]?.message ?? '';

      Alert.alert('Ошибка изменения имени', errorMessage);
    } finally {
      setIsRenameProgramModalOpen(false);
      setProgramName('');
    }
  };

  const openChangeProgramNameModal = (programId: string): void => {
    setActiveProgramId(programId);
    setIsRenameProgramModalOpen(true);
  };

  console.log('SERVER DATA', programs);

  return (
    <MainLayout loading={sourcesLoading || loading}>
      <AppHeader
        title='Программы тренировок'
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<GearIcon />}
        onPressRightButton={
          () =>
            // ! Временно переходим по новым экранам отсюда
            navigation.navigate(PageTypes.CREATE_PROGRAM, { programName })
          // navigation.navigate(PageTypes.ADD_EXERCISE_TO_PROGRAM, {
          //   dayName: 'День 1',
          // })
        }
        // headerImage={headerImage}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Создать свою программу'
          onPress={() => setIsAddProgramModalOpen(true)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' justify='flex-start'>
        <Suspense fallback={<div>Loading...</div>}>
          <FlatList
            style={{ width: '100%' }}
            data={programs}
            renderItem={({ item }) => (
              <CardWithImage
                title={item.name}
                isActive={item.id === activeProgramId}
                onCheckHandler={() => setActiveProgramId(item.id)}
                imgSource={item.previewImage}
                onPress={
                  item.isUserProgram
                    ? () =>
                        navigation.navigate(PageTypes.EDIT_PROGRAM, {
                          programId: item.id,
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
                    ? () => console.log('Скопировать карточку', item.id)
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
        </Suspense>
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isAddProgramModalOpen}
        title='Новая программа'
        onPressOk={addProgram}
        onPressCancel={cancelAddProgram}
        message='Введите название программы'
      >
        <AppStyledTextInput
          value={programName}
          onChangeText={(value) => setProgramName(value)}
          placeholder='Название программы'
          mt='10px'
        />
      </ConfirmModal>

      <ConfirmModal
        isOpen={isRenameProgramModalOpen}
        title='Изменить название программы'
        onPressOk={() => renameProgramHandler(activeProgramId, programName)}
        onPressCancel={cancelRenameProgram}
        message='Введите новое название программы'
      >
        <AppStyledTextInput
          value={programName}
          onChangeText={(value) => setProgramName(value)}
          placeholder='Название программы'
          mt='10px'
        />
      </ConfirmModal>
    </MainLayout>
  );
}
