import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import {
  CssSize,
  FlexAlignItemsTypes,
  FlexDirectionTypes,
  FlexJustifyTypes,
  MarginPaddingProps,
} from '../../common/types';

type Props = ViewProps &
  MarginPaddingProps & {
    direction?: FlexDirectionTypes;
    justify?: FlexJustifyTypes;
    align?: FlexAlignItemsTypes;
    w?: CssSize;
    h?: CssSize;
    flex?: string;
    // Временное свойство для подкраски на этапе разработки
    devColor?: boolean;
  };

const StyledFlex = styled.View<Props>`
  width: ${(props) => props.w ?? '100%'};
  height: ${(props) => props.h ?? 'auto'};

  display: flex;
  flex-direction: ${(props) => props.direction ?? 'column'};
  justify-content: ${(props) => props.justify ?? 'center'};
  align-items: ${(props) => props.align ?? 'center'};
  flex: ${(props) => props.flex ?? 'none'};

  background-color: ${(props) => (props.devColor ? 'red' : 'transparent')};

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};

  padding-top: ${(props) => props.pt ?? '0px'};
  padding-bottom: ${(props) => props.pb ?? '0px'};
  padding-left: ${(props) => props.pl ?? '0px'};
  padding-right: ${(props) => props.pr ?? '0px'};
`;

export const AppFlex: React.FC<Props> = (props) => (
  <StyledFlex {...props}>{props.children}</StyledFlex>
);
