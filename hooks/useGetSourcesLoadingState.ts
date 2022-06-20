import { useIsFocused } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../context/app/appContext';

export function useGetSourcesLoadingState(screenSourcesCount: number): boolean {
  const { sourcesCount, clearSourcesCount } = useAppContext();
  // set loader=true while sourceCount is not updated
  const [isSourcesCountCleared, setIsSourcesCountCleared] = useState(false);

  const isFocused = useIsFocused();

  const loading = useMemo(
    () =>
      (isFocused && sourcesCount !== screenSourcesCount) ||
      !isSourcesCountCleared,
    [sourcesCount, isSourcesCountCleared]
  );

  // set sourceCount === 0 at first time screen render
  useEffect(() => {
    clearSourcesCount();
    setIsSourcesCountCleared(true);
  }, []);

  // ! Временно отключим лодер
  // return loading;
  return false;
}
