import { useMutation } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { v4 } from 'uuid';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { InfoCard } from '../../../components/cards/InfoCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
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
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import {
  PageTypes,
  TypeCreateExercisePageTypes,
} from '../../../navigation/types';
import { TypeTransformedExerciseData } from '../../exercises/AllExercisesScreen/types';
import { TypeAddExerciseToProgram } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function AddExerciseToProgram({
  route,
  navigation,
}: TypeAddExerciseToProgram) {
  const { dayName, pageType } = route.params;

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const [createProgram] = useMutation(CREATE_PROGRAM);
  const [updateProgram] = useMutation(UPDATE_PROGRAM);

  const {
    activeDay,
    changeExercisesOrder,
    deleteExercise,
    trainingProgram,
    initialProgramData,
    addExerciseToDay,
  } = useProgramContext();

  const saveProgram = async (): Promise<void> => {
    setIsSaveModalOpen(false);

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
        }).then(({ data: result }) => result.createProgram);

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

  const exercises = useMemo(
    () =>
      trainingProgram.days.find(day => day.id === activeDay?.id)?.exercises ??
      [],
    [trainingProgram]
  );

  const saveProgramHandler = (): void => {
    const isProgramChanged = !isEqual(trainingProgram, initialProgramData);
    if (isProgramChanged) {
      return setIsSaveModalOpen(true);
    }
    navigation.navigate(PageTypes.ALL_PROGRAMS);
  };

  const exerciseCardPressHandler = (
    exercise: TypeTransformedExerciseData
  ): void => {
    if (activeDay) {
      const dayExercise: TypeExercise = {
        id: v4(),
        exerciseId: exercise.id,
        name: exercise.name,
        muscleGroups: exercise.muscles,
      };

      addExerciseToDay(activeDay.id, dayExercise);

      navigation.goBack();
    }
  };

  if (!activeDay) return null;

  const renderItem = ({ item, drag }: RenderItemParams<TypeExercise>) => {
    return (
      <ScaleDecorator>
        <InfoCard
          onLongPress={drag}
          title={item.name}
          description={item.muscleGroups}
          onPress={() => console.log('Нажали на карточку', item.id)}
          deleteHandler={() => deleteExercise(activeDay.id, item.id)}
          infoPressHandler={() => console.log('Нажали инфо', item.id)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <MainLayout loading={sourcesLoading}>
      <AppHeader
        title={dayName}
        onPressLeftButton={() => navigation.goBack()}
        rightButtonIcon={<CheckIcon />}
        onPressRightButton={saveProgramHandler}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Добавить упражнение'
          onPress={() =>
            navigation.navigate(PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM, {
              callback: exerciseCardPressHandler,
            })
          }
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' align='stretch' justify='flex-start'>
        <DraggableFlatList
          data={exercises}
          onDragEnd={({ data }) => changeExercisesOrder(activeDay.id, data)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{ width: '100%', height: LIST_TOP_SPACE }} />
          }
          ListFooterComponent={
            <View style={{ width: '100%', height: LIST_BOTTOM_SPACE }} />
          }
          ListEmptyComponent={
            <EmptyList message='Нет упражнений. Добавьте первое упражнение.' />
          }
          alwaysBounceVertical={false}
        />
      </AppFlex>

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`} />

      <ConfirmModal
        isOpen={isSaveModalOpen}
        title='Сохранение'
        onPressOk={saveProgram}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Сохранить программу тренировок?'
      />
    </MainLayout>
  );
}
