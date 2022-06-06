import { TouchableOpacityProps } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { TypeImageBackground } from '../../common/types';

type Props = TouchableOpacityProps & {
  title: string;
};

type TextProps = {
  theme: DefaultTheme;
};

const TouchableWrapper = styled.TouchableOpacity<TouchableOpacityProps>`
  width: 100%;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: #efefef;
  border-bottom-color: #5e5e5e;
`;

const Text = styled.Text<TextProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HomeMenuItem: React.FC<Props> = (props) => (
  <TouchableWrapper onPress={props.onPress} activeOpacity={0.9}>
    <StyledImageBackground
      source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
      resizeMode='repeat'
    >
      <Text>{props.title}</Text>
    </StyledImageBackground>
  </TouchableWrapper>
);
