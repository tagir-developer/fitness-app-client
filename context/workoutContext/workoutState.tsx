import { useReducer } from 'react';
import { WorkoutContext } from './workoutContext';
import { appReducer } from './workoutReducer';
import {
  WorkoutContextActionTypes,
  TypeWorkoutContextState,
  TypeWorkout,
  TypeWorkoutExercise,
} from './types';
import { v4 } from 'uuid';
import { TypeExercise } from '../trainingProgram/types';
import formatISO from 'date-fns/formatISO';

// const defaultWorkoutData: TypeWorkout = {
//   id: '',
//   startDateTime: null,
//   endDateTime: null,
//   exercises: [],
// };

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
    dayExercises: TypeExercise[]
  ): void => {
    const workoutData: TypeWorkout = {
      id: v4(),
      programName,
      startDateTime: null,
      endDateTime: null,
      exercises: dayExercises.map(exercise => {
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

  const addExercise = (exercise: TypeExercise) => {
    const exerciseData: TypeWorkoutExercise = {
      id: v4(),
      exerciseId: exercise.exerciseId,
      name: exercise.name,
      muscleGroups: exercise.muscleGroups,
      sets: [],
    };

    dispatch({
      type: WorkoutContextActionTypes.ADD_EXERCISE,
      payload: exerciseData,
    });
  };

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

  // const setEditedProgramData = (program: TypeWorkout): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.SET_EDITED_PROGRAM_DATA,
  //     payload: program,
  //   });
  // };

  // const addTrainingDay = (name: string): void => {
  //   const newDay: TypeTrainingDay = {
  //     id: v4(),
  //     name,
  //     exercises: [],
  //   };

  //   dispatch({
  //     type: WorkoutContextActionTypes.ADD_SET,
  //     payload: newDay,
  //   });
  // };

  // const changeDaysOrder = (days: TypeTrainingDay[]): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.CHANGE_DAYS_ORDER,
  //     payload: days,
  //   });
  // };

  // const copyDay = (id: string): void => {
  //   const copiedDay = state.trainingProgram.days.find(day => day.id === id);

  //   const dayId = v4();

  //   if (copiedDay) {
  //     const newDay: TypeTrainingDay = {
  //       ...copiedDay,
  //       id: dayId,
  //       name: copiedDay.name + ' (копия)',
  //     };

  //     dispatch({
  //       type: WorkoutContextActionTypes.ADD_SET,
  //       payload: newDay,
  //     });
  //   }
  // };

  // const deleteDay = (id: string): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.DELETE_SET,
  //     payload: id,
  //   });
  // };

  // const renameDay = (id: string, name: string): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.RENAME_DAY,
  //     payload: { id, name },
  //   });
  // };

  // const addExerciseToDay = (dayId: string, exercise: TypeExercise): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.ADD_EXERCISE_TO_DAY,
  //     payload: { dayId, exercise },
  //   });
  // };

  // const deleteExercise = (dayId: string, exerciseId: string): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.DELETE_EXERCISE,
  //     payload: { dayId, exerciseId },
  //   });
  // };

  // const changeExercisesOrder = (
  //   dayId: string,
  //   exercises: TypeExercise[]
  // ): void => {
  //   dispatch({
  //     type: WorkoutContextActionTypes.CHANGE_EXERCISE_ORDER,
  //     payload: { dayId, exercises },
  //   });
  // };

  // const setActiveDay = (dayId: string | null): void => {
  //   const activeDay =
  //     state.trainingProgram.days.find(day => day.id === dayId) ?? null;

  //   dispatch({
  //     type: WorkoutContextActionTypes.SET_ACTIVE_EXERCISE,
  //     payload: activeDay,
  //   });
  // };

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
        // trainingProgram: state.trainingProgram,
        // initialProgramData: state.initialProgramData,
        // activeDay: state.activeDay,
        // setEditedProgramData,
        // addTrainingDay,
        // changeDaysOrder,
        // deleteDay,
        // copyDay,
        // addExerciseToDay,
        // renameDay,
        // deleteExercise,
        // changeExercisesOrder,
        // setActiveDay,
        setLoading,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
