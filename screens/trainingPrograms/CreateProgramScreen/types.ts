import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeCreateProgramScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CREATE_PROGRAM
>;

// type TypeMuscleGroup = {
//   id: string;
//   name: string;
// };

// export type TypeTrainingProgram = {
//   id: string;
//   title: string;
//   muscleGroups: TypeMuscleGroup[];
// };
