import { createContext, useContext } from 'react';
import { TypeWorkoutContext } from './types';

export const WorkoutContext = createContext<TypeWorkoutContext>(
  {} as TypeWorkoutContext
);

export const useWorkoutContext = () => useContext(WorkoutContext);
