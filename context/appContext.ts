import { createContext, useContext } from 'react';

type TypeAppContext = {
  sourcesCount: number;
  addSourcesCount: () => void;
  clearSourcesCount: () => void;
};

export const AppContext = createContext<TypeAppContext>({
  sourcesCount: 0,
  addSourcesCount: () => {},
  clearSourcesCount: () => {},
});

export const useAppContext = () => useContext(AppContext);
