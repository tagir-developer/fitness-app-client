import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';

type Props = TouchableOpacityProps &
  MarginProps & {
    w?: CssSize;
    h?: CssSize;
  };

const ShapeContainer = styled.TouchableOpacity<Props>`
  width: ${(props) => props.w ?? '30px'};
  height: ${(props) => props.h ?? '30px'};

  background: ${(props) => props.theme.colors.empty};

  border-radius: 50px;

  overflow: hidden;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const ShapeInner = styled.View`
  height: auto;
  overflow: hidden;

  border-radius: 52px;

  margin: 2px;
`;

export const ShapeWithGradientBorder: React.FC<Props> = (props) => (
  <ShapeContainer {...props} activeOpacity={0.9}>
    <LinearGradient colors={['#3C3C3C', '#F8F8F8']}>
      <ShapeInner>{props.children}</ShapeInner>
    </LinearGradient>
  </ShapeContainer>
);
