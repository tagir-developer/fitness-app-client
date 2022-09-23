import { ActionMap } from '../../common/types';
import { TypeTransformedExerciseData } from '../../screens/exercises/AllExercisesScreen/types';
import { TypeTrainingDay } from '../trainingProgram/types';

export enum WorkoutContextActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_NEW_WORKOUT_DATA = 'SET_NEW_WORKOUT_DATA',
  START_WORKOUT = 'START_WORKOUT',
  STOP_WORKOUT = 'STOP_WORKOUT',
  ADD_EXERCISE = 'ADD_EXERCISE',
  DELETE_EXERCISE = 'DELETE_EXERCISE',
  CHANGE_EXERCISES_ORDER = 'CHANGE_EXERCISES_ORDER',
  ADD_SET = 'ADD_SET',
  COPY_SET = 'COPY_SET',
  DELETE_SET = 'DELETE_SET',
  SET_WORKOUT_TIME = 'SET_WORKOUT_TIME',
  INCREASE_WORKOUT_TIME = 'INCREASE_WORKOUT_TIME',
  SET_INTERVAL_ID = 'SET_INTERVAL_ID',
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
  name: string;
  description: string;
  startDateTime: string | null;
  endDateTime: string | null;
  exercises: TypeWorkoutExercise[];
};

export type TypeWorkoutContextState = {
  loading: boolean;
  activeWorkout: TypeWorkout | null;
  activeExercise: TypeWorkoutExercise | null;
  timerCount: number | null;
  workoutTime: number | null;
  intervalId: NodeJS.Timer | null;
};

export type WorkoutPayload = {
  [WorkoutContextActionTypes.SET_LOADING]: boolean;
  [WorkoutContextActionTypes.SET_NEW_WORKOUT_DATA]: TypeWorkout;
  [WorkoutContextActionTypes.START_WORKOUT]: string;
  [WorkoutContextActionTypes.STOP_WORKOUT]: string;
  [WorkoutContextActionTypes.SET_WORKOUT_TIME]: number | null;
  [WorkoutContextActionTypes.INCREASE_WORKOUT_TIME]: undefined;
  [WorkoutContextActionTypes.SET_INTERVAL_ID]: NodeJS.Timer | null;
  [WorkoutContextActionTypes.ADD_EXERCISE]: TypeWorkoutExercise;
  [WorkoutContextActionTypes.DELETE_EXERCISE]: string;
  [WorkoutContextActionTypes.CHANGE_EXERCISES_ORDER]: TypeWorkoutExercise[];
  [WorkoutContextActionTypes.ADD_SET]: {
    exerciseId: string;
    setData: TypeWorkoutSet;
  };
  [WorkoutContextActionTypes.COPY_SET]: {
    exerciseId: string;
    setId: string;
  };
  [WorkoutContextActionTypes.DELETE_SET]: {
    exerciseId: string;
    setId: string;
  };
};

export type TypeWorkoutContextAction =
  ActionMap<WorkoutPayload>[keyof ActionMap<WorkoutPayload>];

export type TypeWorkoutContext = TypeWorkoutContextState & {
  setNewWorkoutData: (
    programName: string,
    trainingDay: TypeTrainingDay
  ) => void;
  addExercise: (exercise: TypeTransformedExerciseData) => void;
  deleteExercise: (exerciseId: string) => void;
  changeExercisesOrder: (exercises: TypeWorkoutExercise[]) => void;
  addSetToExercise: (exerciseId: string, setData: TypeWorkoutSet) => void;
  copySet: (exerciseId: string, setId: string) => void;
  deleteSet: (exerciseId: string, setId: string) => void;
  setLoading: (value: boolean) => void;
  startWorkout: () => void;
  stopWorkout: () => void;
};
