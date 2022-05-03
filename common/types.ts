// styled-component types

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
