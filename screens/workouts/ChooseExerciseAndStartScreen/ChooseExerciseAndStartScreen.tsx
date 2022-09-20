import { useMutation } from '@apollo/client';
import isEqual from 'lodash.isequal';
import { useState } from 'react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
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
import { TypeExercise } from '../../../context/trainingProgram/types';
import { TypeWorkoutExercise } from '../../../context/workoutContext/types';
import { useWorkoutContext } from '../../../context/workoutContext/workoutContext';
import { CREATE_WORKOUT } from '../../../graphql/workouts/workoutMutations';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeScreenProps } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 150;

export default function ChooseExerciseAndStartScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { dayName, dayId } = route.params;

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const [createWorkout] = useMutation(CREATE_WORKOUT);

  const { activeWorkout, changeExercisesOrder, deleteExercise, addExercise } =
    useWorkoutContext();

  const saveWorkout = async (): Promise<void> => {
    setIsSaveModalOpen(false);

    // ! логика сохранения тренировки в базе
  };

  // const saveWorkout = async (): Promise<void> => {
  //   setIsSaveModalOpen(false);

  //   if (pageType === TypeCreateExercisePageTypes.CREATE) {
  //     const programData: TypeTrainingProgram = {
  //       ...trainingProgram,
  //       isUserProgram: true,
  //     };

  //     try {
  //       await createProgram({
  //         variables: {
  //           program: programData,
  //         },
  //       }).then(({ data: result }) => result.createProgram);

  //       Alert.alert('Программа создана');
  //     } catch (e) {
  //       const errorMessage: string =
  //         e?.networkError?.result?.errors?.[0]?.message ?? '';

  //       Alert.alert('Ошибка создания программы', errorMessage);
  //     }
  //   }

  //   if (pageType === TypeCreateExercisePageTypes.EDIT) {
  //     try {
  //       const updatedDays: TypeTrainingDay[] = trainingProgram.days.map(day => {
  //         const dayExercises: TypeExercise[] = day.exercises.map(exercise => {
  //           const transformedExercise: TypeExercise = {
  //             id: exercise.id,
  //             exerciseId: exercise.exerciseId,
  //             name: exercise.name,
  //             muscleGroups: exercise.muscleGroups,
  //           };

  //           return transformedExercise;
  //         });

  //         const transformedDay: TypeTrainingDay = {
  //           id: day.id,
  //           name: day.name,
  //           exercises: dayExercises,
  //         };

  //         return transformedDay;
  //       });
  //       await updateProgram({
  //         variables: {
  //           programId: trainingProgram.id,
  //           trainingDays: updatedDays,
  //         },
  //       });

  //       Alert.alert('Программа обновлена');
  //     } catch (e) {
  //       const errorMessage: string =
  //         e?.networkError?.result?.errors?.[0]?.message ?? '';

  //       Alert.alert('Ошибка обновления программы', errorMessage);
  //     }
  //   }

  //   navigation.navigate(PageTypes.ALL_PROGRAMS);
  // };

  // const exercises = useMemo(
  //   () =>
  //     trainingProgram.days.find(day => day.id === activeDay?.id)?.exercises ??
  //     [],
  //   [trainingProgram]
  // );

  // const saveProgramHandler = (): void => {
  //   const isProgramChanged = !isEqual(trainingProgram, initialWorkoutState);
  //   if (isProgramChanged) {
  //     return setIsSaveModalOpen(true);
  //   }
  //   navigation.navigate(PageTypes.ALL_PROGRAMS);
  // };

  // if (!activeDay) return null;

  if (!activeWorkout) return null;

  const renderItem = ({
    item,
    drag,
  }: RenderItemParams<TypeWorkoutExercise>) => {
    return (
      <ScaleDecorator>
        <InfoCard
          onLongPress={drag}
          title={item.name}
          description={item.muscleGroups}
          onPress={() =>
            console.log(
              'Нажали на карточку и перешли в добавление сетов',
              item.id
            )
          }
          deleteHandler={() => deleteExercise(item.id)}
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
        // onPressRightButton={saveProgramHandler}
        onPressRightButton={() => {}}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        <AppButton
          title='Добавить упражнение'
          onPress={() =>
            navigation.navigate(PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM)
          }
          fontSize='17px'
          mt='100px'
        />
      </OpacityDarkness>

      <AppFlex flex='1' align='stretch' justify='flex-start'>
        <DraggableFlatList
          data={activeWorkout.exercises}
          onDragEnd={({ data }) => changeExercisesOrder(data)}
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
        title='Завершить тренировку'
        onPressOk={saveWorkout}
        onPressCancel={() => setIsSaveModalOpen(false)}
        message='Вы действительно хотите завершить тренировку?'
      />
    </MainLayout>
  );
}
