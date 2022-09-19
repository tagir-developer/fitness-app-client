import { useLazyQuery, useMutation } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import { cutLongString } from '../../../common/helpers/cutLongString';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { AppStyledTextInput } from '../../../components/formControls/AppStyledTextInput';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { YesNoModal } from '../../../components/modals/YesNoModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { useProgramContext } from '../../../context/trainingProgram/programContext';
import {
  TypeExercise,
  TypeTrainingDay,
  TypeTrainingProgram,
} from '../../../context/trainingProgram/types';
import {
  CREATE_PROGRAM,
  UPDATE_PROGRAM,
} from '../../../graphql/programs/programMutations';
import { GET_PROGRAM_BY_ID } from '../../../graphql/programs/programQuery';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import {
  PageTypes,
  TypeCreateExercisePageTypes,
} from '../../../navigation/types';
import { createMuscleGroupsDescription } from './helpers';
import { TypeCreateProgramScreenProps } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function CreateProgramScreen({
  route,
  navigation,
}: TypeCreateProgramScreenProps) {
  const { programName, programId, pageType } = route.params;

  const {
    loading: programLoading,
    trainingProgram,
    setNewProgramData,
    setEditedProgramData,
    changeDaysOrder,
    deleteDay,
    copyDay,
    renameDay,
    setActiveDay,
    addTrainingDay,
    initialProgramData,
  } = useProgramContext();

  const [dayName, setDayName] = useState('');

  const [isAddDayModalOpen, setIsAddDayModalOpen] = useState(false);
  const [isChangeDayNameModalOpen, setIsChangeDayNameModalOpen] =
    useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [activeDayId, setActiveDayId] = useState('');

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const [getProgramData, { loading, error, data }] = useLazyQuery<{
    getProgramById: TypeTrainingProgram;
  }>(GET_PROGRAM_BY_ID);

  const [createProgram] = useMutation(CREATE_PROGRAM);
  const [updateProgram] = useMutation(UPDATE_PROGRAM);

  const addDay = (): void => {
    if (!dayName.length) {
      return Alert.alert('Ошибка', 'Введите название дня');
    }
    addTrainingDay(dayName);
    setIsAddDayModalOpen(false);
    setDayName('');
  };

  const cancelAddDay = (): void => {
    setIsAddDayModalOpen(false);
    setDayName('');
  };

  const saveProgram = async (): Promise<void> => {
    setIsSaveModalOpen(false);
    setIsExitModalOpen(false);

    if (pageType === TypeCreateExercisePageTypes.CREATE) {
      const programData: TypeTrainingProgram = {
        ...trainingProgram,
        isUserProgram: true,
      };

      try {
        await createProgram({
          variables: {
            program: programData,
          },
        });

        Alert.alert('Программа создана');
      } catch (e) {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка создания программы', errorMessage);
      }
    }

    if (pageType === TypeCreateExercisePageTypes.EDIT) {
      try {
        const updatedDays: TypeTrainingDay[] = trainingProgram.days.map(day => {
          const dayExercises: TypeExercise[] = day.exercises.map(exercise => {
            const transformedExercise: TypeExercise = {
              id: exercise.id,
              exerciseId: exercise.exerciseId,
              name: exercise.name,
              muscleGroups: exercise.muscleGroups,
            };

            return transformedExercise;
          });

          const transformedDay: TypeTrainingDay = {
            id: day.id,
            name: day.name,
            exercises: dayExercises,
          };

          return transformedDay;
        });
        await updateProgram({
          variables: {
            programId: trainingProgram.id,
            trainingDays: updatedDays,
          },
        });

        Alert.alert('Программа обновлена');
      } catch (e) {
        const errorMessage: string =
          e?.networkError?.result?.errors?.[0]?.message ?? '';

        Alert.alert('Ошибка обновления программы', errorMessage);
      }
    }

    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const saveProgramHandler = (): void => {
    const isProgramChanged = !isEqual(trainingProgram, initialProgramData);
    if (isProgramChanged) {
      return setIsSaveModalOpen(true);
    }
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const exitHandler = (): void => {
    const isProgramChanged = !isEqual(trainingProgram, initialProgramData);
    if (isProgramChanged) {
      return setIsExitModalOpen(true);
    }
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const cardPressHandler = (id: string, name: string): void => {
    setActiveDay(id);
    navigation.navigate(PageTypes.ADD_EXERCISE_TO_PROGRAM, {
      dayName: name,
      pageType,
    });
  };

  const openChangeProgramNameModal = (dayId: string): void => {
    setActiveDayId(dayId);
    setIsChangeDayNameModalOpen(true);
  };

  const changeDayName = (): void => {
    renameDay(activeDayId, dayName);
    setIsChangeDayNameModalOpen(false);
    setDayName('');
  };

  useEffect(() => {
    if (programName && pageType === TypeCreateExercisePageTypes.CREATE) {
      setNewProgramData(programName);
    }

    if (programId && pageType === TypeCreateExercisePageTypes.EDIT) {
      getProgramData({
        variables: {
          programId,
        },
      });
    }
  }, [pageType]);

  useEffect(() => {
    if (!loading && data && pageType === TypeCreateExercisePageTypes.EDIT) {
      setEditedProgramData(data.getProgramById);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные программы');
      navigation.goBack();
    }
  }, [error]);

  const headerTitle = useMemo(() => {
    if (programName && pageType === TypeCreateExercisePageTypes.CREATE)
      return programName;

    if (!loading && data && pageType === TypeCreateExercisePageTypes.EDIT)
      return data.getProgramById.name;

    return '';
  }, [data]);

  const renderItem = ({
    item: day,
    drag,
  }: RenderItemParams<TypeTrainingDay>) => {
    return (
      <ScaleDecorator>
        <SimpleCard
          onLongPress={drag}
          title={day.name}
          description={createMuscleGroupsDescription(day)}
          onPress={() => cardPressHandler(day.id, day.name)}
          deleteHandler={() => deleteDay(day.id)}
          copyHandler={() => copyDay(day.id)}
          editHandler={() => openChangeProgramNameModal(day.id)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <MainLayout loading={sourcesLoading || loading || programLoading}>
      <AppHeader
        title={headerTitle}
        onPressLeftButton={exitHandler}
        rightButtonIcon={<CheckIcon />}
        onPressRightButton={saveProgramHandler}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Добавить новый день'
          onPress={() => setIsAddDayModalOpen(true)}
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' align='stretch' justify='flex-start'>
        <DraggableFlatList
          data={trainingProgram.days}
          onDragEnd={({ data: renderedData }) => changeDaysOrder(renderedData)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={
            <EmptyList message='Нет тренировочных дней. Добавьте первый день.' />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isAddDayModalOpen}
        title='Добавить новый день'
        onPressOk={addDay}
        onPressCancel={cancelAddDay}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={dayName}
          onChangeText={setDayName}
          placeholder='Название дня'
          mt='10px'
        />
      </ConfirmModal>

      <ConfirmModal
        isOpen={isChangeDayNameModalOpen}
        title='Изменить название дня'
        onPressOk={changeDayName}
        onPressCancel={() => setIsChangeDayNameModalOpen(false)}
        message='Введите название дня'
      >
        <AppStyledTextInput
          value={dayName}
          onChangeText={setDayName}
          placeholder='Название дня'
          mt='10px'
        />
      </ConfirmModal>

      <ConfirmModal
        isOpen={isSaveModalOpen}
        title='Сохранение'
        onPressOk={saveProgram}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Сохранить программу тренировок?'
      />

      <YesNoModal
        isOpen={isExitModalOpen}
        title='Выход из программы'
        message='Сохранить программу тренировок перед тем как выйти?'
        onPressYes={saveProgram}
        onPressNo={() => navigation.navigate(PageTypes.ALL_PROGRAMS)}
        onPressCancel={() => setIsExitModalOpen(false)}
      />
    </MainLayout>
  );
}
