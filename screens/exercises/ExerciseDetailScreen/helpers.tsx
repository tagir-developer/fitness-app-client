import { TypeTransformedExerciseCardData } from '../../../common/types';
import { exercisesImages } from '../../../images/exercises';
import { musclesImages } from '../../../images/muscles';
import { TypeTransformedMuscleData } from '../../muscles/AllMusclesScreen/types';
import {
  TypeExerciseDetailData,
  TypeTransformedExerciseDetailData,
} from './types';

export const transformExerciseDetailData = (
  exerciseData: TypeExerciseDetailData
): TypeTransformedExerciseDetailData => {
  const transformedData: TypeTransformedExerciseDetailData = {
    id: exerciseData.id,
    name: exerciseData.name,
    description: exerciseData.description,
    descriptionImages: exerciseData.descriptionImages.map((image) => {
      return (
        exercisesImages.descriptionImages?.[image] ??
        exercisesImages.descriptionImages.notFound
      );
    }),
    similarExercises: exerciseData.similarExercises.map((exercise) => {
      const transformedExerciseData: TypeTransformedExerciseCardData = {
        ...exercise,
        previewImage:
          exercisesImages.cardPreviewImages.exercises?.[exercise.previewImage],
      };

      return transformedExerciseData;
    }),
    primaryMuscles: exerciseData.muscles
      .filter((muscle) => muscle.workLevel.muscleWorkLevel === 1)
      .map((item) => {
        const transformedMuscleData: TypeTransformedMuscleData = {
          id: item.id,
          name: item.name,
          previewImage:
            musclesImages.cardPreviewImages.muscles[item.previewImage],
        };

        return transformedMuscleData;
      }),
    secondaryMuscles: exerciseData.muscles
      .filter((muscle) => muscle.workLevel.muscleWorkLevel !== 1)
      .map((item) => {
        const transformedMuscleData: TypeTransformedMuscleData = {
          id: item.id,
          name: item.name,
          previewImage:
            musclesImages.cardPreviewImages.muscles[item.previewImage],
        };

        return transformedMuscleData;
      }),
  };

  return transformedData;
};
