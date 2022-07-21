import { programImages } from '../../../images/programs';
import { TypeProgramDetailData, TypeTransformedProgramData } from './types';

export const transformProgramDetailData = (
  program: TypeProgramDetailData
): TypeTransformedProgramData => {
  const newProgram: TypeTransformedProgramData = {
    ...program,
    descriptionImages: program.descriptionImages.map((image) => {
      return (
        programImages.programDescriptionImages?.[image] ??
        programImages.programDescriptionImages.notFound
      );
    }),
  };

  return newProgram;
};
