import {
  WorkoutContextActionTypes,
  TypeWorkoutContextAction,
  TypeWorkoutContextState,
  TypeWorkoutExercise,
} from './types';

export const appReducer = (
  state: TypeWorkoutContextState,
  action: TypeWorkoutContextAction
): TypeWorkoutContextState => {
  switch (action.type) {
    case WorkoutContextActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case WorkoutContextActionTypes.SET_NEW_WORKOUT_DATA:
      return {
        ...state,
        activeWorkout: action.payload,
      };
    case WorkoutContextActionTypes.SET_NEW_WORKOUT_DATA:
      return {
        ...state,
        activeWorkout: action.payload,
      };
    case WorkoutContextActionTypes.START_WORKOUT:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? { ...state.activeWorkout, startDateTime: action.payload }
          : null,
      };
    case WorkoutContextActionTypes.STOP_WORKOUT:
      return {
        ...state,
        workoutTime: null,
        activeWorkout: state.activeWorkout
          ? { ...state.activeWorkout, endDateTime: action.payload }
          : null,
      };
    case WorkoutContextActionTypes.SET_WORKOUT_TIME:
      return {
        ...state,
        workoutTime: action.payload,
      };
    case WorkoutContextActionTypes.INCREASE_WORKOUT_TIME:
      return {
        ...state,
        workoutTime: (state.workoutTime ?? 0) + 1,
      };
    case WorkoutContextActionTypes.SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.payload,
      };
    case WorkoutContextActionTypes.ADD_EXERCISE:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: [...state.activeWorkout.exercises, action.payload],
            }
          : null,
      };
    case WorkoutContextActionTypes.DELETE_EXERCISE:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: state.activeWorkout.exercises.filter(
                exercise => exercise.id !== action.payload
              ),
            }
          : null,
      };
    case WorkoutContextActionTypes.CHANGE_EXERCISES_ORDER:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: action.payload,
            }
          : null,
      };
    case WorkoutContextActionTypes.ADD_SET:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: state.activeWorkout.exercises.map(exercise => {
                if (exercise.id === action.payload.exerciseId) {
                  const newExerciseData: TypeWorkoutExercise = {
                    ...exercise,
                    sets: [...exercise.sets, action.payload.setData],
                  };
                  return newExerciseData;
                }
                return exercise;
              }),
            }
          : null,
      };
    case WorkoutContextActionTypes.COPY_SET:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: state.activeWorkout.exercises.map(exercise => {
                if (exercise.id === action.payload.exerciseId) {
                  const copiedSet = exercise.sets.find(
                    set => set.id === action.payload.setId
                  );
                  const newExerciseData: TypeWorkoutExercise = {
                    ...exercise,
                    sets: copiedSet
                      ? [...exercise.sets, copiedSet]
                      : exercise.sets,
                  };
                  return newExerciseData;
                }
                return exercise;
              }),
            }
          : null,
      };
    case WorkoutContextActionTypes.DELETE_SET:
      return {
        ...state,
        activeWorkout: state.activeWorkout
          ? {
              ...state.activeWorkout,
              exercises: state.activeWorkout.exercises.map(exercise => {
                if (exercise.id === action.payload.exerciseId) {
                  const newExerciseData: TypeWorkoutExercise = {
                    ...exercise,
                    sets: exercise.sets.filter(
                      set => set.id !== action.payload.setId
                    ),
                  };
                  return newExerciseData;
                }
                return exercise;
              }),
            }
          : null,
      };
    default:
      return state;
  }
};
