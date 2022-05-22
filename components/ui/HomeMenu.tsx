import { LinearGradient } from 'expo-linear-gradient';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginProps, TypeThemeProps } from '../../common/types';

type Props = ViewProps &
  MarginProps & {
    w?: CssSize;
    h?: CssSize;
  };

const StyledView = styled.View<TypeThemeProps & Props>`
  width: ${(props) => props.w ?? props.theme.width};
  height: ${(props) => props.h ?? 'auto'};

  border-radius: 36px;
  overflow: hidden;

  background: ${(props) => props.theme.colors.empty};

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const StyledInnerView = styled.View`
  overflow: hidden;
  border-radius: 34px;

  margin: 2px;
`;

export const HomeMenu: React.FC<Props> = (props) => (
  <StyledView>
    <LinearGradient colors={['#F8F8F8', '#3C3C3C']}>
      <StyledInnerView>{props.children}</StyledInnerView>
    </LinearGradient>
  </StyledView>
);
