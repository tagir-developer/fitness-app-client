import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PageTypes, RootSignedInStackParamList } from '../../navigation/types';

export type TypeChooseExerciseProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.CHOOSE_EXERCISE_FOR_NEW_PROGRAM
>;
