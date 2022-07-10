import {
  ProgramContextActionTypes,
  TypeProgramContextAction,
  TypeProgramContextState,
  TypeTrainingDay,
} from './types';

export const appReducer = (
  state: TypeProgramContextState,
  action: TypeProgramContextAction
): TypeProgramContextState => {
  switch (action.type) {
    case ProgramContextActionTypes.SET_ACTIVE_DAY:
      return {
        ...state,
        activeDay: action.payload,
      };
    case ProgramContextActionTypes.SET_NEW_PROGRAM_DATA:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          id: action.payload.id,
          name: action.payload.name,
        },
        initialProgramData: {
          ...state.initialProgramData,
          id: action.payload.id,
          name: action.payload.name,
        },
      };
    case ProgramContextActionTypes.ADD_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: [...state.trainingProgram.days, action.payload],
        },
      };
    case ProgramContextActionTypes.CHANGE_DAYS_ORDER:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: action.payload,
        },
      };
    case ProgramContextActionTypes.DELETE_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.filter(
            (day) => day.id !== action.payload
          ),
        },
      };
    case ProgramContextActionTypes.RENAME_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map((day) => {
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
    case ProgramContextActionTypes.ADD_EXERCISE_TO_DAY:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map((day) => {
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
    case ProgramContextActionTypes.DELETE_EXERCISE:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map((day) => {
            if (day.id === action.payload.dayId) {
              const newDay: TypeTrainingDay = {
                ...day,
                exercises: day.exercises.filter(
                  (exercise) => exercise.id !== action.payload.exerciseId
                ),
              };
              return newDay;
            }
            return day;
          }),
        },
      };
    case ProgramContextActionTypes.CHANGE_EXERCISE_ORDER:
      return {
        ...state,
        trainingProgram: {
          ...state.trainingProgram,
          days: state.trainingProgram.days.map((day) => {
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
