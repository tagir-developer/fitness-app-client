import { createContext, useContext } from 'react';

type TypeAppContext = {
  loadingSourcesStack: string[];
  addLoadingSource: (value: string) => void;
  removeLoadingSource: (value: string) => void;
};

export const AppContext = createContext<TypeAppContext>({
  loadingSourcesStack: [],
  addLoadingSource: () => {},
  removeLoadingSource: () => {},
});

export const useAppContext = () => useContext(AppContext);
