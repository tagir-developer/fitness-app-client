import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
import { TypeArticleSection } from '../../../common/types';
import {
  PageTypes,
  RootSignedInStackParamList,
} from '../../../navigation/types';

export type TypeScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  PageTypes.PROGRAM_DETAIL
>;

export type TypeProgramDetailData = {
  id: string;
  name: string;
  description: TypeArticleSection[];
  descriptionImages: string[];
};

export type TypeTransformedProgramData = Omit<
  TypeProgramDetailData,
  'descriptionImages'
> & {
  descriptionImages: ImageSourcePropType[];
};
