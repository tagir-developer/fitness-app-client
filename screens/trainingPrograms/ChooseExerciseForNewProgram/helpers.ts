import { TypeExerciseListItem } from './types';

function arrayRandElement(arr: string[]) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

const MUSCLE_GROUPS_MOCKED = [
  'Грудь, спина',
  'Ноги, трицепс',
  'Предплечия, бицепс, пресс',
  'Поясница',
];

export const transformExercisesDataToListFormat = (
  exercises: Omit<TypeExerciseListItem, 'muscleGroups'>[]
): TypeExerciseListItem[] => {
  return exercises.map((item) => {
    const result: TypeExerciseListItem = {
      ...item,
      muscleGroups: arrayRandElement(MUSCLE_GROUPS_MOCKED),
    };

    return result;
  });
};
