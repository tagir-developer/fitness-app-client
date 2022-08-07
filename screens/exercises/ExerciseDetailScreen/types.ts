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
  PageTypes.EXERCISE_DETAIL
>;

export type TypeMuscleCardItem = {
  id: string;
  name: string;
  previewImage: string;
  workLevel: {
    muscleWorkLevel: number;
  };
};

export type TypeExerciseDetailData = {
  id: string;
  name: string;
  description: TypeArticleSection[];
  descriptionImages: string[];
  similarExercises: TypeExerciseCardData[];
  muscles: TypeMuscleCardItem[];
};

type TypeTransformedMuscleData = TypeTransformedExerciseCardData;

export type TypeTransformedExerciseDetailData = Omit<
  TypeExerciseDetailData,
  'descriptionImages' | 'similarExercises' | 'muscles'
> & {
  descriptionImages: ImageSourcePropType[];
  similarExercises: TypeTransformedExerciseCardData[];
  primaryMuscles: TypeTransformedMuscleData[];
  secondaryMuscles: TypeTransformedMuscleData[];
};
