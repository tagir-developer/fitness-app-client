import { GestureResponderEvent } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';

type Props = MarginProps & {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  size?: CssSize;
  color?: string;
  underline?: boolean;
};

type TransparentContainerProps = MarginProps & {
  width?: CssSize;
};

type ButtonTextProps = {
  theme: DefaultTheme;
  size?: CssSize;
  color?: string;
  underline?: boolean;
};

const TransparentContainer = styled.TouchableOpacity<TransparentContainerProps>`
  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${(props) => props.theme.fonts.normal};
  font-size: ${(props) => props.size ?? '18px'};
  font-weight: 400;
  color: ${(props) => props.color ?? props.theme.colors.accent};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  text-decoration-color: ${(props) => props.color ?? props.theme.colors.accent};
`;

export const LinkButton: React.FC<Props> = (props) => (
  <TransparentContainer
    onPress={props.onPress}
    mt={props.mt}
    mb={props.mb}
    ml={props.ml}
    mr={props.mr}
  >
    <ButtonText
      size={props.size}
      color={props.color}
      underline={props.underline}
    >
      {props.title}
    </ButtonText>
  </TransparentContainer>
);
