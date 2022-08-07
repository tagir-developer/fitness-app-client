import { TypeTransformedExerciseCardData } from '../../../common/types';
import { exercisesImages } from '../../../images/exercises';
import { musclesImages } from '../../../images/muscles';
import { TypeMuscleDetailData, TypeTransformedMuscleData } from './types';

export const transformProgramDetailData = (
  muscleData: TypeMuscleDetailData
): TypeTransformedMuscleData => {
  const transformedData: TypeTransformedMuscleData = {
    ...muscleData,
    descriptionImages: muscleData.descriptionImages.map((image) => {
      return (
        musclesImages.descriptionImages?.[image] ??
        musclesImages.descriptionImages.notFound
      );
    }),
    exercises: muscleData.exercises.map((exercise) => {
      const transformedItem: TypeTransformedExerciseCardData = {
        ...exercise,
        previewImage:
          exercisesImages.cardPreviewImages.exercises?.[exercise.previewImage],
      };

      return transformedItem;
    }),
  };

  return transformedData;
};
