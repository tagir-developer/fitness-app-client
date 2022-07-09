import { ImageSourcePropType } from 'react-native';

export type TypeContentImages = {
  [key: string]: ImageSourcePropType;
};

export type TypeProgramImages = {
  cardPreviewImages: TypeContentImages;
  programDescriptionImages: TypeContentImages;
};
