import { ActionMap } from '../../common/types';
import { TypeExercise } from '../trainingProgram/types';

export enum WorkoutContextActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_NEW_WORKOUT_DATA = 'SET_NEW_WORKOUT_DATA',
  START_WORKOUT = 'START_WORKOUT',
  ADD_EXERCISE = 'ADD_EXERCISE',
  DELETE_EXERCISE = 'DELETE_EXERCISE',
  CHANGE_EXERCISES_ORDER = 'CHANGE_EXERCISES_ORDER',
  // SET_EDITED_PROGRAM_DATA = 'SET_EDITED_PROGRAM_DATA',
  // SET_ACTIVE_EXERCISE = 'SET_ACTIVE_EXERCISE',
  // ADD_SET = 'ADD_SET',
  // DELETE_SET = 'DELETE_SET',
  // COPY_DAY = 'COPY_DAY',
  // CHANGE_DAYS_ORDER = 'CHANGE_DAYS_ORDER',
  // CHANGE_EXERCISE_ORDER = 'CHANGE_EXERCISE_ORDER',
}

export type TypeWorkoutSet = {
  id: string;
  weight: number;
  repeates: number;
  comment: string;
};

export type TypeWorkoutExercise = {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroups: string;
  sets: TypeWorkoutSet[];
};

export type TypeWorkout = {
  id: string;
  programName: string;
  startDateTime: string | null;
  endDateTime: string | null;
  exercises: TypeWorkoutExercise[];
};

export type TypeWorkoutContextState = {
  loading: boolean;
  activeWorkout: TypeWorkout | null;
  activeExercise: TypeWorkoutExercise | null;
  timerCount: number | null;
};

export type WorkoutPayload = {
  [WorkoutContextActionTypes.SET_LOADING]: boolean;
  [WorkoutContextActionTypes.SET_NEW_WORKOUT_DATA]: TypeWorkout;
  [WorkoutContextActionTypes.START_WORKOUT]: string;
  [WorkoutContextActionTypes.ADD_EXERCISE]: TypeWorkoutExercise;
  [WorkoutContextActionTypes.DELETE_EXERCISE]: string;
  [WorkoutContextActionTypes.CHANGE_EXERCISES_ORDER]: TypeWorkoutExercise[];
  // [WorkoutContextActionTypes.ADD_SET]: TypeTrainingDay;
  // [WorkoutContextActionTypes.SET_EDITED_PROGRAM_DATA]: TypeWorkout;
  // [WorkoutContextActionTypes.CHANGE_DAYS_ORDER]: TypeTrainingDay[];
  // [WorkoutContextActionTypes.DELETE_SET]: string;
  // [WorkoutContextActionTypes.RENAME_DAY]: {
  //   id: string;
  //   name: string;
  // };
  // [WorkoutContextActionTypes.CHANGE_EXERCISE_ORDER]: {
  //   dayId: string;
  //   exercises: TypeExercise[];
  // };
  // [WorkoutContextActionTypes.SET_ACTIVE_EXERCISE]: TypeTrainingDay | null;
};

export type TypeWorkoutContextAction =
  ActionMap<WorkoutPayload>[keyof ActionMap<WorkoutPayload>];

export type TypeWorkoutContext = TypeWorkoutContextState & {
  setNewWorkoutData: (
    programName: string,
    dayExercises: TypeExercise[]
  ) => void;
  addExercise: (exercise: TypeExercise) => void;
  deleteExercise: (exerciseId: string) => void;
  changeExercisesOrder: (exercises: TypeWorkoutExercise[]) => void;
  // setEditedProgramData: (program: TypeWorkout) => void;
  // addTrainingDay: (name: string) => void;
  // changeDaysOrder: (days: TypeTrainingDay[]) => void;
  // deleteDay: (id: string) => void;
  // copyDay: (id: string) => void;
  // addExerciseToDay: (dayId: string, exercise: TypeExercise) => void;
  // renameDay: (id: string, name: string) => void;
  // deleteExercise: (dayId: string, exerciseId: string) => void;
  // changeExercisesOrder: (dayId: string, exercises: TypeExercise[]) => void;
  // setActiveDay: (dayId: string | null) => void;
  setLoading: (value: boolean) => void;
  startWorkout: () => void;
};
