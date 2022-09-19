import { useReducer } from 'react';
import { WorkoutContext } from './workoutContext';
import { appReducer } from './workoutReducer';
import {
  WorkoutContextActionTypes,
  TypeExercise,
  TypeWorkoutContextState,
  TypeTrainingDay,
  TypeWorkout,
} from './types';
import { v4 } from 'uuid';

const defaultWorkoutData: TypeWorkout = {
  id: '',
  name: '',
  days: [],
};

export const initialWorkoutState: TypeWorkoutContextState = {
  loading: true,
  trainingProgram: defaultWorkoutData,
  initialProgramData: defaultWorkoutData,
  activeDay: null,
};

export const WorkoutState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialWorkoutState);

  const setLoading = (value: boolean) => {
    dispatch({
      type: WorkoutContextActionTypes.SET_LOADING,
      payload: value,
    });
  };

  const setNewProgramData = (name: string): void => {
    const programId = v4();

    dispatch({
      type: WorkoutContextActionTypes.SET_NEW_PROGRAM_DATA,
      payload: { name, id: programId },
    });
  };

  const setEditedProgramData = (program: TypeWorkout): void => {
    dispatch({
      type: WorkoutContextActionTypes.SET_EDITED_PROGRAM_DATA,
      payload: program,
    });
  };

  const addTrainingDay = (name: string): void => {
    const newDay: TypeTrainingDay = {
      id: v4(),
      name,
      exercises: [],
    };

    dispatch({
      type: WorkoutContextActionTypes.ADD_DAY,
      payload: newDay,
    });
  };

  const changeDaysOrder = (days: TypeTrainingDay[]): void => {
    dispatch({
      type: WorkoutContextActionTypes.CHANGE_DAYS_ORDER,
      payload: days,
    });
  };

  const copyDay = (id: string): void => {
    const copiedDay = state.trainingProgram.days.find(day => day.id === id);

    const dayId = v4();

    if (copiedDay) {
      const newDay: TypeTrainingDay = {
        ...copiedDay,
        id: dayId,
        name: copiedDay.name + ' (копия)',
      };

      dispatch({
        type: WorkoutContextActionTypes.ADD_DAY,
        payload: newDay,
      });
    }
  };

  const deleteDay = (id: string): void => {
    dispatch({
      type: WorkoutContextActionTypes.DELETE_DAY,
      payload: id,
    });
  };

  const renameDay = (id: string, name: string): void => {
    dispatch({
      type: WorkoutContextActionTypes.RENAME_DAY,
      payload: { id, name },
    });
  };

  const addExerciseToDay = (dayId: string, exercise: TypeExercise): void => {
    dispatch({
      type: WorkoutContextActionTypes.ADD_EXERCISE_TO_DAY,
      payload: { dayId, exercise },
    });
  };

  const deleteExercise = (dayId: string, exerciseId: string): void => {
    dispatch({
      type: WorkoutContextActionTypes.DELETE_EXERCISE,
      payload: { dayId, exerciseId },
    });
  };

  const changeExercisesOrder = (
    dayId: string,
    exercises: TypeExercise[]
  ): void => {
    dispatch({
      type: WorkoutContextActionTypes.CHANGE_EXERCISE_ORDER,
      payload: { dayId, exercises },
    });
  };

  const setActiveDay = (dayId: string | null): void => {
    const activeDay =
      state.trainingProgram.days.find(day => day.id === dayId) ?? null;

    dispatch({
      type: WorkoutContextActionTypes.SET_ACTIVE_DAY,
      payload: activeDay,
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        loading: state.loading,
        trainingProgram: state.trainingProgram,
        initialProgramData: state.initialProgramData,
        activeDay: state.activeDay,
        setNewProgramData,
        setEditedProgramData,
        addTrainingDay,
        changeDaysOrder,
        deleteDay,
        copyDay,
        addExerciseToDay,
        renameDay,
        deleteExercise,
        changeExercisesOrder,
        setActiveDay,
        setLoading,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
