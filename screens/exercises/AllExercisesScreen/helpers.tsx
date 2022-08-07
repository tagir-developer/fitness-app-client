import { exercisesImages } from '../../../images/exercises';
import { TypeExerciseData, TypeTransformedExerciseData } from './types';

export const transformExerciseDataToListFormat = (
  exercises: TypeExerciseData[]
): TypeTransformedExerciseData[] => {
  return exercises.map((item) => {
    const transformedData: TypeTransformedExerciseData = {
      ...item,
      previewImage:
        exercisesImages.cardPreviewImages.exercises?.[item.previewImage],
      muscles: item.muscles
        .filter((muscle) => muscle.workLevel.muscleWorkLevel === 1)
        .map((muscle) => muscle.name)
        .join(', ')
        .toLowerCase(),
    };

    return transformedData;
  });
};
