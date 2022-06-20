import { useReducer } from 'react';
import { AppContext } from './appContext';
import { appReducer } from './appReducer';
import { AppContextActionTypes, TypeAppContextState } from './types';

export const initialState: TypeAppContextState = {
  sourcesCount: 0,
};

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addSourcesCount = (): void => {
    dispatch({ type: AppContextActionTypes.INCREASE_SOURCES_COUNT });
  };

  const clearSourcesCount = (): void => {
    dispatch({ type: AppContextActionTypes.CLEAR_SOURCES_COUNT });
  };

  return (
    <AppContext.Provider
      value={{
        sourcesCount: state.sourcesCount,
        addSourcesCount,
        clearSourcesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
