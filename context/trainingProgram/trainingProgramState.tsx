import { useReducer } from 'react';
import { AppContext } from './programContext';
import { appReducer } from './programReducer';
import {
  ProgramContextActionTypes,
  TypeExercise,
  TypeProgramContextState,
  TypeTrainingDay,
  TypeTrainingProgram,
} from './types';
import { v4 } from 'uuid';

export const initialState: TypeProgramContextState = {
  trainingProgram: {
    id: '',
    name: '',
    days: [],
  },
};

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setActiveProgram = (program: TypeTrainingProgram): void => {
    dispatch({
      type: ProgramContextActionTypes.SET_ACTIVE_PROGRAM,
      payload: program,
    });
  };

  const setNewProgramData = (name: string): void => {
    const programId = v4();

    dispatch({
      type: ProgramContextActionTypes.SET_NEW_PROGRAM_DATA,
      payload: { name, id: programId },
    });
  };

  const addTrainingDay = (name: string): void => {
    const newDay: TypeTrainingDay = {
      id: v4(),
      name,
      muscleGroups: [],
      exercises: [],
    };

    dispatch({
      type: ProgramContextActionTypes.ADD_DAY,
      payload: newDay,
    });
  };

  const changeDaysOrder = (days: TypeTrainingDay[]): void => {
    dispatch({
      type: ProgramContextActionTypes.CHANGE_DAYS_ORDER,
      payload: days,
    });
  };

  const copyDay = (id: string): void => {
    const copiedDay = state.trainingProgram.days.find((day) => day.id === id);

    if (copiedDay) {
      const newDay: TypeTrainingDay = {
        ...copiedDay,
        name: copiedDay.name + ' (копия)',
      };

      dispatch({
        type: ProgramContextActionTypes.ADD_DAY,
        payload: newDay,
      });
    }
  };

  const deleteDay = (id: string): void => {
    dispatch({
      type: ProgramContextActionTypes.DELETE_DAY,
      payload: id,
    });
  };

  const renameDay = (id: string, name: string): void => {
    dispatch({
      type: ProgramContextActionTypes.RENAME_DAY,
      payload: { id, name },
    });
  };

  const addExerciseToDay = (dayId: string, exercise: TypeExercise): void => {
    dispatch({
      type: ProgramContextActionTypes.ADD_EXERCISE_TO_DAY,
      payload: { dayId, exercise },
    });
  };

  const deleteExercise = (dayId: string, exerciseId: string): void => {
    dispatch({
      type: ProgramContextActionTypes.DELETE_EXERCISE,
      payload: { dayId, exerciseId },
    });
  };

  const changeExercisesOrder = (
    dayId: string,
    exercises: TypeExercise[]
  ): void => {
    dispatch({
      type: ProgramContextActionTypes.CHANGE_EXERCISE_ORDER,
      payload: { dayId, exercises },
    });
  };

  return (
    <AppContext.Provider
      value={{
        trainingProgram: state.trainingProgram,
        setActiveProgram,
        setNewProgramData,
        addTrainingDay,
        changeDaysOrder,
        deleteDay,
        copyDay,
        addExerciseToDay,
        renameDay,
        deleteExercise,
        changeExercisesOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
