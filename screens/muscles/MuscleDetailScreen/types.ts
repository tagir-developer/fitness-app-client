import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import {
  TypeArticleSection,
  TypeExerciseCardData,
  TypeTransformedExerciseCardData,
} from '../../../common/types';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.MUSCLE_DETAIL
>;

export type TypeMuscleDetailData = {
  id: string;
  name: string;
  description: TypeArticleSection[];
  descriptionImages: string[];
  exercises: TypeExerciseCardData[];
};

export type TypeTransformedMuscleData = Omit<
  TypeMuscleDetailData,
  'descriptionImages' | 'exercises'
> & {
  descriptionImages: ImageSourcePropType[];
  exercises: TypeTransformedExerciseCardData[];
};
