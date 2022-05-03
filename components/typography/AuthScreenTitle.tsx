import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginPaddingProps } from '../../common/types';
import * as CSS from 'csstype';

type Props = TextProps &
  MarginPaddingProps & {
    w?: CssSize;
    h?: CssSize;
    size?: CssSize;
    lineHeight?: CssSize;
    color?: string;
  };

export const AuthScreenTitle = styled.Text<Props>`
  width: ${(props) => props.w ?? '100%'};
  height: ${(props) => props.h ?? 'auto'};

  font-family: ${(props) => props.theme.fonts.light};
  font-size: ${(props) => props.size ?? '34px'};
  color: ${(props) => props.color ?? '#394c67'};
  font-weight: 300;
  text-align: center;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};

  padding-top: ${(props) => props.pt ?? '0px'};
  padding-bottom: ${(props) => props.pb ?? '0px'};
  padding-left: ${(props) => props.pl ?? '0px'};
  padding-right: ${(props) => props.pr ?? '0px'};
`;
