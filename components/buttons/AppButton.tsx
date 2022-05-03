import { ReactChild } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';

type Props = MarginProps & {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  color?: string;
};

type StyledTouchableOpacityProps = MarginProps & {
  width?: CssSize;
};

type ButtonTextProps = {
  theme: DefaultTheme;
  color?: string;
};

type ImageBackgroundProps = {
  children: ReactChild;
};

const RoundedTouchableOpacity = styled.TouchableOpacity<StyledTouchableOpacityProps>`
  width: 286px;
  height: 57px;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => props.color ?? props.theme.colors.primaryText};
`;

const StyledImageBackground = styled.ImageBackground<ImageBackgroundProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AppButton: React.FC<Props> = (props) => (
  <RoundedTouchableOpacity
    onPress={props.onPress}
    mt={props.mt}
    mb={props.mb}
    ml={props.ml}
    mr={props.mr}
    activeOpacity={0.9}
  >
    <StyledImageBackground
      source={require('../../assets/images/ui/steelButton.png')}
      resizeMode='contain'
    >
      <ButtonText color={props.color}>{props.title.toUpperCase()}</ButtonText>
    </StyledImageBackground>
  </RoundedTouchableOpacity>
);
