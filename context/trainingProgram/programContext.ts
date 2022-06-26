import { createContext, useContext } from 'react';
import { initialProgramState } from './trainingProgramState';
import { TypeProgramContext } from './types';

export const ProgramContext = createContext<TypeProgramContext>(
  {} as TypeProgramContext
);
// export const ProgramContext = createContext<TypeProgramContext>({
//   trainingProgram: initialProgramState.trainingProgram,
//   activeDay: initialProgramState.activeDay,
//   setActiveProgram: () => null,
//   setNewProgramData: () => null,
//   addTrainingDay: () => null,
//   changeDaysOrder: () => null,
//   deleteDay: () => null,
//   copyDay: () => null,
//   addExerciseToDay: () => null,
//   renameDay: () => null,
//   deleteExercise: () => null,
//   changeExercisesOrder: () => null,
//   setActiveDay: () => null,
// });

export const useProgramContext = () => useContext(ProgramContext);
