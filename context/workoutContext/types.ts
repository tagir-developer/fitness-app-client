import { ActionMap } from '../../common/types';

export enum WorkoutContextActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_NEW_PROGRAM_DATA = 'SET_NEW_PROGRAM_DATA',
  SET_EDITED_PROGRAM_DATA = 'SET_EDITED_PROGRAM_DATA',
  SET_ACTIVE_DAY = 'SET_ACTIVE_DAY',
  ADD_DAY = 'ADD_DAY',
  RENAME_DAY = 'RENAME_DAY',
  DELETE_DAY = 'DELETE_DAY',
  COPY_DAY = 'COPY_DAY',
  CHANGE_DAYS_ORDER = 'CHANGE_DAYS_ORDER',
  DELETE_EXERCISE = 'DELETE_EXERCISE',
  CHANGE_EXERCISE_ORDER = 'CHANGE_EXERCISE_ORDER',
  ADD_EXERCISE_TO_DAY = 'ADD_EXERCISE_TO_DAY',
}

export type TypeExercise = {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroups: string;
};

export type TypeTrainingDay = {
  id: string;
  name: string;
  exercises: TypeExercise[];
};

export type TypeWorkout = {
  id: string;
  name: string;
  isUserProgram?: boolean;
  days: TypeTrainingDay[];
};

export type TypeWorkoutContextState = {
  loading: boolean;
  trainingProgram: TypeWorkout;
  initialProgramData: TypeWorkout;
  activeDay: TypeTrainingDay | null;
};

export type WorkoutPayload = {
  [WorkoutContextActionTypes.ADD_DAY]: TypeTrainingDay;
  [WorkoutContextActionTypes.SET_NEW_PROGRAM_DATA]: {
    id: string;
    name: string;
  };
  [WorkoutContextActionTypes.SET_EDITED_PROGRAM_DATA]: TypeWorkout;
  [WorkoutContextActionTypes.CHANGE_DAYS_ORDER]: TypeTrainingDay[];
  [WorkoutContextActionTypes.DELETE_DAY]: string;
  [WorkoutContextActionTypes.RENAME_DAY]: {
    id: string;
    name: string;
  };
  [WorkoutContextActionTypes.ADD_EXERCISE_TO_DAY]: {
    dayId: string;
    exercise: TypeExercise;
  };
  [WorkoutContextActionTypes.DELETE_EXERCISE]: {
    dayId: string;
    exerciseId: string;
  };
  [WorkoutContextActionTypes.CHANGE_EXERCISE_ORDER]: {
    dayId: string;
    exercises: TypeExercise[];
  };
  [WorkoutContextActionTypes.SET_ACTIVE_DAY]: TypeTrainingDay | null;
  [WorkoutContextActionTypes.SET_LOADING]: boolean;
};

export type TypeWorkoutContextAction =
  ActionMap<WorkoutPayload>[keyof ActionMap<WorkoutPayload>];

export type TypeWorkoutContext = TypeWorkoutContextState & {
  setNewProgramData: (name: string) => void;
  setEditedProgramData: (program: TypeWorkout) => void;
  addTrainingDay: (name: string) => void;
  changeDaysOrder: (days: TypeTrainingDay[]) => void;
  deleteDay: (id: string) => void;
  copyDay: (id: string) => void;
  addExerciseToDay: (dayId: string, exercise: TypeExercise) => void;
  renameDay: (id: string, name: string) => void;
  deleteExercise: (dayId: string, exerciseId: string) => void;
  changeExercisesOrder: (dayId: string, exercises: TypeExercise[]) => void;
  setActiveDay: (dayId: string | null) => void;
  setLoading: (value: boolean) => void;
};
