import {
  WorkoutContextActionTypes,
  TypeWorkoutContextAction,
  TypeWorkoutContextState,
  TypeTrainingDay,
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
    case WorkoutContextActionTypes.SET_ACTIVE_DAY:
      return {
        ...state,
        activeDay: action.payload,
      };
    case WorkoutContextActionTypes.SET_NEW_PROGRAM_DATA:
      return {
        ...state,
        trainingProgram: {
          id: action.payload.id,
          name: action.payload.name,
          days: [],
        },
        initialProgramData: {
          id: action.payload.id,
          name: action.payload.name,
          days: [],
        },
        loading: false,
      };
    case WorkoutContextActionTypes.SET_EDITED_PROGRAM_DATA:
      return {
        ...state,
        trainingProgram: action.payload,
        initialProgramData: action.payload,
        loading: false,
      };
    case WorkoutContextActionTypes.ADD_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: [...state.trainingProgram.days, action.payload],
        },
      };
    case WorkoutContextActionTypes.CHANGE_DAYS_ORDER:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: action.payload,
        },
      };
    case WorkoutContextActionTypes.DELETE_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.filter(
            day => day.id !== action.payload
          ),
        },
      };
    case WorkoutContextActionTypes.RENAME_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map(day => {
            if (day.id === action.payload.id) {
              const newDay: TypeTrainingDay = {
                ...day,
                name: action.payload.name,
              };
              return newDay;
            }
            return day;
          }),
        },
      };
    case WorkoutContextActionTypes.ADD_EXERCISE_TO_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map(day => {
            if (day.id === action.payload.dayId) {
              const newDay: TypeTrainingDay = {
                ...day,
                exercises: [...day.exercises, action.payload.exercise],
              };
              return newDay;
            }
            return day;
          }),
        },
      };
    case WorkoutContextActionTypes.DELETE_EXERCISE:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map(day => {
            if (day.id === action.payload.dayId) {
              const newDay: TypeTrainingDay = {
                ...day,
                exercises: day.exercises.filter(
                  exercise => exercise.id !== action.payload.exerciseId
                ),
              };
              return newDay;
            }
            return day;
          }),
        },
      };
    case WorkoutContextActionTypes.CHANGE_EXERCISE_ORDER:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map(day => {
            if (day.id === action.payload.dayId) {
              const newDay: TypeTrainingDay = {
                ...day,
                exercises: action.payload.exercises,
              };
              return newDay;
            }
            return day;
          }),
        },
      };
    default:
      return state;
  }
};
