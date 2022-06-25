import { createContext, useContext } from 'react';
import { TypeProgramContext } from './types';

export const AppContext = createContext<TypeProgramContext>({
  sourcesCount: 0,
  addSourcesCount: () => null,
  clearSourcesCount: () => null,
});

export const useAppContext = () => useContext(AppContext);
