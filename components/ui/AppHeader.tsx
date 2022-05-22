import { ReactChild } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';
import GoBackIcon from '../../common/icons/goBack';
import { CssSize, MarginProps } from '../../common/types';
import { HeaderButton } from '../buttons/HeaderButton';

type Props = {
  title: string;
  onPressLeftButton: () => void;
  onPressRightButton?: () => void;
  leftButtonIcon?: JSX.Element;
  rightButtonIcon?: JSX.Element;
};

type ButtonTextProps = {
  theme: DefaultTheme;
  color?: string;
  fontSize?: CssSize;
};

type ImageBackgroundProps = {
  children: ReactChild;
};

const StyledView = styled.View`
  width: 100%;
  height: 114px;

  margin-bottom: 20px;
`;

const TitleText = styled.Text<ButtonTextProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: 17px;
  color: ${(props) => props.color ?? props.theme.colors.primaryText};

  text-align: center;
`;

const StyledImageBackground = styled.ImageBackground<ImageBackgroundProps>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const LeftContainer = styled.View`
  width: 20%;
  height: 100%;

  display: flex;
  align-items: center;

  padding-top: 47px;
`;

const TitleContainer = styled.View`
  width: 60%;
  height: 100%;

  display: flex;
  align-items: center;

  padding-top: 52px;
  padding-left: 5px;
  padding-right: 5px;
`;

const RightContainer = styled.View`
  width: 20%;
  height: 100%;

  display: flex;
  align-items: center;

  padding-top: 47px;
`;

export const AppHeader: React.FC<Props> = (props) => (
  <StyledView>
    <StyledImageBackground
      source={require('../../assets/images/ui/header-bg.png')}
      resizeMode='cover'
    >
      <>
        <LeftContainer>
          <HeaderButton
            onPress={props.onPressLeftButton}
            icon={props.leftButtonIcon ?? <GoBackIcon />}
          />
        </LeftContainer>

        <TitleContainer>
          <TitleText>{props.title}</TitleText>
        </TitleContainer>

        <RightContainer>
          <HeaderButton
            onPress={props.onPressRightButton}
            icon={props.rightButtonIcon ?? <GoBackIcon />}
          />
        </RightContainer>
      </>
    </StyledImageBackground>
  </StyledView>
);
