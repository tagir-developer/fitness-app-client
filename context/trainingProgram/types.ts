import { ActionMap } from '../../common/types';

export enum ProgramContextActionTypes {
  SET_ACTIVE_PROGRAM = 'SET_ACTIVE_PROGRAM',
  SET_ACTIVE_DAY = 'SET_ACTIVE_DAY',
  ADD_DAY = 'ADD_DAY',
  RENAME_DAY = 'RENAME_DAY',
  DELETE_DAY = 'DELETE_DAY',
  COPY_DAY = 'COPY_DAY',
  CHANGE_DAYS_ORDER = 'CHANGE_DAYS_ORDER',
  DELETE_EXERCISE = 'DELETE_EXERCISE',
  CHANGE_EXERCISE_ORDER = 'CHANGE_EXERCISE_ORDER',
  SET_NEW_PROGRAM_DATA = 'SET_NEW_PROGRAM_DATA',
  ADD_EXERCISE_TO_DAY = 'ADD_EXERCISE_TO_DAY',
}

export type TypeExercise = {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroups: string[];
};

export type TypeTrainingDay = {
  id: string;
  name: string;
  exercises: TypeExercise[];
};

export type TypeTrainingProgram = {
  id: string;
  name: string;
  isUserProgram: boolean;
  previewImage: string;
  days: TypeTrainingDay[];
};

export type TypeProgramContextState = {
  trainingProgram: TypeTrainingProgram;
  initialProgramData: TypeTrainingProgram;
  activeDay: TypeTrainingDay | null;
};

export type ProgramPayload = {
  [ProgramContextActionTypes.SET_ACTIVE_PROGRAM]: TypeTrainingProgram;
  [ProgramContextActionTypes.ADD_DAY]: TypeTrainingDay;
  [ProgramContextActionTypes.SET_NEW_PROGRAM_DATA]: {
    id: string;
    name: string;
  };
  [ProgramContextActionTypes.CHANGE_DAYS_ORDER]: TypeTrainingDay[];
  [ProgramContextActionTypes.DELETE_DAY]: string;
  [ProgramContextActionTypes.RENAME_DAY]: {
    id: string;
    name: string;
  };
  [ProgramContextActionTypes.ADD_EXERCISE_TO_DAY]: {
    dayId: string;
    exercise: TypeExercise;
  };
  [ProgramContextActionTypes.DELETE_EXERCISE]: {
    dayId: string;
    exerciseId: string;
  };
  [ProgramContextActionTypes.CHANGE_EXERCISE_ORDER]: {
    dayId: string;
    exercises: TypeExercise[];
  };
  [ProgramContextActionTypes.SET_ACTIVE_DAY]: TypeTrainingDay | null;
};

export type TypeProgramContextAction =
  ActionMap<ProgramPayload>[keyof ActionMap<ProgramPayload>];

export type TypeProgramContext = TypeProgramContextState & {
  setActiveProgram: (program: TypeTrainingProgram) => void;
  setNewProgramData: (name: string) => void;
  addTrainingDay: (name: string) => void;
  changeDaysOrder: (days: TypeTrainingDay[]) => void;
  deleteDay: (id: string) => void;
  copyDay: (id: string) => void;
  addExerciseToDay: (dayId: string, exercise: TypeExercise) => void;
  renameDay: (id: string, name: string) => void;
  deleteExercise: (dayId: string, exerciseId: string) => void;
  changeExercisesOrder: (dayId: string, exercises: TypeExercise[]) => void;
  setActiveDay: (dayId: string | null) => void;
};
