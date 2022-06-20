import {
  AppContextActionTypes,
  TypeAppContextAction,
  TypeAppContextState,
} from './types';

export const appReducer = (
  state: TypeAppContextState,
  action: TypeAppContextAction
) => {
  switch (action.type) {
    case AppContextActionTypes.INCREASE_SOURCES_COUNT:
      return {
        ...state,
        sourcesCount: state.sourcesCount + 1,
      };
    case AppContextActionTypes.CLEAR_SOURCES_COUNT:
      return {
        ...state,
        sourcesCount: 0,
      };
    default:
      return state;
  }
};
