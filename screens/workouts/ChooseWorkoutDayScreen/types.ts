import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TypeTrainingProgram } from '../../../context/trainingProgram/types';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CHOOSE_WORKOUT_DAY
>;

export type TypeActiveProgramData = TypeTrainingProgram;

export type TypeTransformedProgramData = TypeActiveProgramData;
