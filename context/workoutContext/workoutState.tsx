import { useReducer } from 'react';
import { WorkoutContext } from './workoutContext';
import { appReducer } from './workoutReducer';
import {
  WorkoutContextActionTypes,
  TypeWorkoutContextState,
  TypeWorkout,
  TypeWorkoutExercise,
  TypeWorkoutSet,
} from './types';
import { v4 } from 'uuid';
import {
  TypeExercise,
  TypeTrainingDay,
  TypeTrainingProgram,
} from '../trainingProgram/types';
import formatISO from 'date-fns/formatISO';
import { format } from 'date-fns';
import { TypeTransformedExerciseData } from '../../screens/exercises/AllExercisesScreen/types';

export const initialWorkoutState: TypeWorkoutContextState = {
  loading: true,
  activeWorkout: null,
  activeExercise: null,
  timerCount: null,
};

export const WorkoutState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialWorkoutState);

  const setLoading = (value: boolean) => {
    dispatch({
      type: WorkoutContextActionTypes.SET_LOADING,
      payload: value,
    });
  };

  const setNewWorkoutData = (
    programName: string,
    trainingDay: TypeTrainingDay
  ): void => {
    const workoutName = `Тренировка от (${format(new Date(), 'dd:MM:yyyy')})`;
    const workoutDescription = `Программа: ${programName} (${trainingDay.name})`;

    const workoutData: TypeWorkout = {
      id: v4(),
      name: workoutName,
      description: workoutDescription,
      startDateTime: null,
      endDateTime: null,
      exercises: trainingDay.exercises.map(exercise => {
        const transformedExercise: TypeWorkoutExercise = {
          id: v4(),
          exerciseId: exercise.exerciseId,
          name: exercise.name,
          muscleGroups: exercise.muscleGroups,
          sets: [],
        };

        return transformedExercise;
      }),
    };

    dispatch({
      type: WorkoutContextActionTypes.SET_NEW_WORKOUT_DATA,
      payload: workoutData,
    });
  };

  const startWorkout = () => {
    const startDateTime = formatISO(new Date());

    dispatch({
      type: WorkoutContextActionTypes.START_WORKOUT,
      payload: startDateTime,
    });
  };

  const addExercise = (exercise: TypeTransformedExerciseData) => {
    const exerciseData: TypeWorkoutExercise = {
      id: v4(),
      exerciseId: exercise.id,
      name: exercise.name,
      muscleGroups: exercise.muscles,
      sets: [],
    };

    dispatch({
      type: WorkoutContextActionTypes.ADD_EXERCISE,
      payload: exerciseData,
    });
  };

  // const addExercise = (exercise: TypeExercise) => {
  //   const exerciseData: TypeWorkoutExercise = {
  //     id: v4(),
  //     exerciseId: exercise.exerciseId,
  //     name: exercise.name,
  //     muscleGroups: exercise.muscleGroups,
  //     sets: [],
  //   };

  //   dispatch({
  //     type: WorkoutContextActionTypes.ADD_EXERCISE,
  //     payload: exerciseData,
  //   });
  // };

  const deleteExercise = (exerciseId: string) => {
    dispatch({
      type: WorkoutContextActionTypes.DELETE_EXERCISE,
      payload: exerciseId,
    });
  };

  const changeExercisesOrder = (exercises: TypeWorkoutExercise[]) => {
    dispatch({
      type: WorkoutContextActionTypes.CHANGE_EXERCISES_ORDER,
      payload: exercises,
    });
  };

  const addSetToExercise = (
    exerciseId: string,
    setData: TypeWorkoutSet
  ): void => {
    dispatch({
      type: WorkoutContextActionTypes.ADD_SET,
      payload: { exerciseId, setData },
    });
  };

  const copySet = (exerciseId: string, setId: string): void => {
    dispatch({
      type: WorkoutContextActionTypes.COPY_SET,
      payload: { exerciseId, setId },
    });
  };

  const deleteSet = (exerciseId: string, setId: string): void => {
    dispatch({
      type: WorkoutContextActionTypes.DELETE_SET,
      payload: { exerciseId, setId },
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        loading: state.loading,
        activeWorkout: state.activeWorkout,
        activeExercise: state.activeExercise,
        timerCount: state.timerCount,
        setNewWorkoutData,
        startWorkout,
        addExercise,
        deleteExercise,
        changeExercisesOrder,
        addSetToExercise,
        copySet,
        deleteSet,
        setLoading,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
