import { LinearGradient } from 'expo-linear-gradient';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginProps, PositionProps } from '../../common/types';

type Props = ViewProps &
  MarginProps &
  PositionProps & {
    w?: CssSize;
    h?: CssSize;
    reverse?: boolean;
  };

const StyledWrapper = styled.View<Props>`
  position: absolute;

  top: ${(props) => props.top ?? 'auto'};
  bottom: ${(props) => props.bottom ?? 'auto'};
  left: ${(props) => props.left ?? 'auto'};
  right: ${(props) => props.right ?? 'auto'};

  width: ${(props) => props.w ?? '100%'};
  height: ${(props) => props.h ?? '150px'};

  z-index: 100;
`;

const ShapeInner = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OpacityDarkness: React.FC<Props> = (props) => (
  <StyledWrapper {...props}>
    <LinearGradient
      colors={
        props.reverse
          ? ['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.01)']
          : ['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.9)']
      }
    >
      <ShapeInner>{props.children}</ShapeInner>
    </LinearGradient>
  </StyledWrapper>
);
