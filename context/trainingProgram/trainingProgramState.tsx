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

export const initialProgramState: TypeProgramContextState = {
  trainingProgram: {
    id: '',
    name: '',
    isUserProgram: true,
    previewImage:
      '../../../assets/images/ui/card-icons/programs/userProgram.jpg',
    days: [],
  },
  initialProgramData: {
    id: '',
    name: '',
    isUserProgram: true,
    previewImage:
      '../../../assets/images/ui/card-icons/programs/userProgram.jpg',
    days: [],
  },
  activeDay: null,
};

export const TrainingProgramState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialProgramState);

  // ! Возможно не нужна эта функция, нигде не используем
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
        trainingProgram: state.trainingProgram,
        initialProgramData: state.initialProgramData,
        activeDay: state.activeDay,
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
        setActiveDay,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};
