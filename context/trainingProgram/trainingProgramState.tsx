import { useReducer } from 'react';
import { ProgramContext } from './programContext';
import { appReducer } from './programReducer';
import {
  ProgramContextActionTypes,
  TypeExercise,
  TypeProgramContextState,
  TypeTrainingDay,
  TypeTrainingProgram,
} from './types';
import { v4 } from 'uuid';

const defaultProgramData: TypeTrainingProgram = {
  id: '',
  name: '',
  // isUserProgram: true,
  // isUserActiveProgram: false,
  // previewImage: '../../../assets/images/ui/card-icons/programs/userProgram.jpg',
  days: [],
};

export const initialProgramState: TypeProgramContextState = {
  loading: true,
  trainingProgram: defaultProgramData,
  initialProgramData: defaultProgramData,
  activeDay: null,
};

export const TrainingProgramState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialProgramState);

  const setLoading = (value: boolean) => {
    dispatch({
      type: ProgramContextActionTypes.SET_LOADING,
      payload: value,
    });
  };

  const setNewProgramData = (name: string): void => {
    const programId = v4();

    dispatch({
      type: ProgramContextActionTypes.SET_NEW_PROGRAM_DATA,
      payload: { name, id: programId },
    });
  };

  const setEditedProgramData = (program: TypeTrainingProgram): void => {
    dispatch({
      type: ProgramContextActionTypes.SET_EDITED_PROGRAM_DATA,
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

    const dayId = v4();

    if (copiedDay) {
      const newDay: TypeTrainingDay = {
        ...copiedDay,
        id: dayId,
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

  const setActiveDay = (dayId: string | null): void => {
    const activeDay =
      state.trainingProgram.days.find((day) => day.id === dayId) ?? null;

    dispatch({
      type: ProgramContextActionTypes.SET_ACTIVE_DAY,
      payload: activeDay,
    });
  };

  return (
    <ProgramContext.Provider
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
    </ProgramContext.Provider>
  );
};
