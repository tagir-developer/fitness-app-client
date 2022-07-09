import { programImages } from '../../../images/programs';
import { TypeProgramData, TypeTransformedProgramData } from './types';

export const transformDataToListFormat = (
  programs: TypeProgramData[]
): TypeTransformedProgramData[] => {
  return programs.map((program) => {
    const newProgram: TypeTransformedProgramData = {
      ...program,
      previewImage: programImages.cardPreviewImages[program.previewImage],
    };

    return newProgram;
  });
};
