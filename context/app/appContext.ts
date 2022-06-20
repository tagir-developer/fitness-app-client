import { createContext, useContext } from 'react';
import { TypeAppContext } from './types';

export const AppContext = createContext<TypeAppContext>({
  sourcesCount: 0,
  addSourcesCount: () => null,
  clearSourcesCount: () => null,
});

export const useAppContext = () => useContext(AppContext);
