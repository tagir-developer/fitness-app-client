// styled-component types

import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';
import { DefaultTheme } from 'styled-components';

export type TypeThemeProps = {
  theme: DefaultTheme;
};

export type CssSize = `${number}${'px' | '%'}`;

export type MarginProps = {
  mt?: CssSize;
  mb?: CssSize;
  ml?: CssSize;
  mr?: CssSize;
};

export type PaddingProps = {
  pt?: CssSize;
  pb?: CssSize;
  pl?: CssSize;
  pr?: CssSize;
  pHorizontal?: CssSize;
  pVertical?: CssSize;
};

export type PositionProps = {
  position?: 'absolute' | 'relative';
  top?: CssSize;
  bottom?: CssSize;
  left?: CssSize;
  right?: CssSize;
};

export type MarginPaddingProps = MarginProps & PaddingProps;

export type FlexDirectionTypes =
  | 'column'
  | 'row'
  | 'row-reverse'
  | 'column-reverse';

export type FlexJustifyTypes =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit';

export type FlexAlignItemsTypes =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'initial'
  | 'inherit';

export type TypeTextAlign = 'center' | 'right' | 'left';

export type TypeImageBackground = {
  children: ReactNode;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type TypeArticleSection = {
  title: string | null;
  subTitle: string | null;
  text: string;
};

export type TypeExerciseCardData = {
  id: string;
  name: string;
  previewImage: string;
};

export type TypeTransformedExerciseCardData = {
  id: string;
  name: string;
  previewImage: ImageSourcePropType;
};
