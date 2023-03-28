import { useMutation } from '@apollo/client';
import { differenceInMinutes } from 'date-fns';
import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DEFAULT_SCREEN_SOURCES_COUNT } from '../../../common/constants';
import CheckIcon from '../../../common/icons/checkIcon';
import { AppButton } from '../../../components/buttons/AppButton';
import { SimpleCard } from '../../../components/cards/SimpleCard';
import { OpacityDarkness } from '../../../components/common/OpacityDarkness';
import { ConfirmModal } from '../../../components/modals/ConfirmModal';
import { AppFlex } from '../../../components/ui/AppFlex';
import { AppHeader } from '../../../components/ui/AppHeader';
import { EmptyList } from '../../../components/ui/EmptyList';
import MainLayout from '../../../components/ui/MainLayout';
import { TypeWorkoutExercise } from '../../../context/workoutContext/types';
import { useWorkoutContext } from '../../../context/workoutContext/workoutContext';
import { CREATE_WORKOUT } from '../../../graphql/workouts/workoutMutations';
import { useGetSourcesLoadingState } from '../../../hooks/useGetSourcesLoadingState';
import { PageTypes } from '../../../navigation/types';
import { TypeTransformedExerciseData } from '../../exercises/AllExercisesScreen/types';
import { TypeScreenProps } from './types';

const LIST_TOP_SPACE = 250;
const LIST_BOTTOM_SPACE = 200;

export default function ChooseExerciseAndStartScreen({
  route,
  navigation,
}: TypeScreenProps) {
  const { dayName, dayId } = route.params;

  // const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  // const [workoutTime, setWorkoutTime] = useState<number | null>(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const sourcesLoading = useGetSourcesLoadingState(
    DEFAULT_SCREEN_SOURCES_COUNT
  );

  const [createWorkout] = useMutation(CREATE_WORKOUT);

  const asdasd = 'sadad'

  const {
    activeWorkout,
    changeExercisesOrder,
    deleteExercise,
    addExercise,
    workoutTime,
    startWorkout,
    stopWorkout,
    intervalId,
  } = useWorkoutContext();

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

  //   navigation.navigate(PageTypes.ALL_PROGRAMS);
  // };

  const exerciseCardPressHandler = (
    exercise: TypeTransformedExerciseData
  ): void => {
    addExercise(exercise);

    navigation.goBack();
  };

  const startWorkoutHandler = (): void => {
    if (activeWorkout) {
      startWorkout();
    }
  };

  const stopWorkoutHandler = (): void => {
    if (intervalId && activeWorkout) {
      stopWorkout();
      clearInterval(intervalId);
    }
  };

  if (!activeWorkout) return null;

  // const isWorkoutStarted = Boolean(activeWorkout.startDateTime);

  // const workoutTime = activeWorkout.startDateTime
  //   ? differenceInMinutes(new Date(activeWorkout.startDateTime), new Date())
  //   : null;

  console.log('workoutTime -----', workoutTime);

  const renderItem = ({
    item,
    drag,
  }: RenderItemParams<TypeWorkoutExercise>) => {
    return (
      <ScaleDecorator>
        <SimpleCard
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
        onPressRightButton={stopWorkoutHandler}
      />

      <OpacityDarkness top='0px' h={`${LIST_TOP_SPACE}px`} reverse={true}>
        {workoutTime === null ? ( // ! для отладки === (должно быть !==) !!!!!
          // <Text style={{ color: 'white' }}>{`${workoutTime} мин.`}</Text>
          <AppFlex flex='1' direction='row'>
            <AppButton
              title='Тест'
              onPress={startWorkoutHandler}
              fontSize='14px'
              mt='100px'
              w='120px'
              h='50px'
              mr='10px'
            />

            <AppButton
              title='Завершить тренировку'
              onPress={startWorkoutHandler}
              fontSize='14px'
              mt='100px'
              w='220px'
              h='50px'
            />
          </AppFlex>
        ) : (
          <AppButton
            title='Начать тренировку'
            onPress={startWorkoutHandler}
            fontSize='17px'
            mt='100px'
          />
        )}
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

      <OpacityDarkness bottom='0px' h={`${LIST_BOTTOM_SPACE}px`}>
        <AppButton
          title='Добавить упражнение'
          onPress={() =>
            navigation.navigate(PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM, {
              callback: exerciseCardPressHandler,
            })
          }
          fontSize='17px'
        />
      </OpacityDarkness>

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
