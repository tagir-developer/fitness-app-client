import { musclesImages } from '../../../images/muscles';
import { TypeMuscleData, TypeTransformedMuscleData } from './types';

export const transformDataToListFormat = (
  muscles: TypeMuscleData[]
): TypeTransformedMuscleData[] => {
  return muscles.map((item) => {
    const transformedData: TypeTransformedMuscleData = {
      ...item,
      previewImage: musclesImages.cardPreviewImages.muscles[item.previewImage],
    };

    return transformedData;
  });
};
