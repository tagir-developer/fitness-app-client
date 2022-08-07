import { musclesImages } from '../../../images/muscles';
import { TypeMuscleGroupData, TypeTransformedMuscleGroupData } from './types';

export const transformDataToListFormat = (
  muscleGroups: TypeMuscleGroupData[]
): TypeTransformedMuscleGroupData[] => {
  return muscleGroups.map((muscleGroup) => {
    const transformedData: TypeTransformedMuscleGroupData = {
      ...muscleGroup,
      previewImage:
        musclesImages.cardPreviewImages.muscleGroups[muscleGroup.previewImage],
    };

    return transformedData;
  });
};
