import { ImageSourcePropType } from 'react-native';

export type TypeContentImages = {
  [key: string]: ImageSourcePropType;
};

export type TypeProgramImages = {
  cardPreviewImages: TypeContentImages;
  programDescriptionImages: TypeContentImages;
};

export type TypeCommonImages = {
  cardPreviewImages: TypeContentImages;
  descriptionImages: TypeContentImages;
};

export type TypeMusclesImages = {
  cardPreviewImages: {
    muscleGroups: TypeContentImages;
    muscles: TypeContentImages;
  };
  descriptionImages: TypeContentImages;
};

export type TypeExercisesImages = {
  cardPreviewImages: {
    exercises: TypeContentImages;
  };
  descriptionImages: TypeContentImages;
};
