import { programImages } from '../../../images/programs';
import { TypeActiveProgramData, TypeTransformedProgramData } from './types';

export const transformProgramData = (
  program: TypeActiveProgramData
): TypeTransformedProgramData => {
  const newProgram: TypeTransformedProgramData = {
    ...program,
    previewImage: programImages.cardPreviewImages[program.previewImage],
  };

  return newProgram;
};
