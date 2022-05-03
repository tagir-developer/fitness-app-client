import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginPaddingProps, TypeTextAlign } from '../../common/types';

type Props = TextProps &
  MarginPaddingProps & {
    w?: CssSize;
    h?: CssSize;
    size?: CssSize;
    lineHeight?: CssSize;
    textAlign?: TypeTextAlign;
    color?: string;
  };

export const AppText = styled.Text<Props>`
  width: ${(props) => props.w ?? '100%'};

  font-family: ${(props) => props.theme.fonts.normal};
  font-size: ${(props) => props.size ?? '16px'};
  color: ${(props) => props.color ?? props.theme.colors.primaryText};
  line-height: ${(props) => props.lineHeight ?? '24px'};
  text-align: ${(props) => props.textAlign ?? 'left'};
  font-weight: 300;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};

  padding-top: ${(props) => props.pt ?? '0px'};
  padding-bottom: ${(props) => props.pb ?? '0px'};
  padding-left: ${(props) => props.pl ?? '0px'};
  padding-right: ${(props) => props.pr ?? '0px'};
`;
