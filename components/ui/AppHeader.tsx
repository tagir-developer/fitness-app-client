import styled, { DefaultTheme } from 'styled-components/native';
import { cutLongString } from '../../common/helpers/cutLongString';
import GoBackIcon from '../../common/icons/goBack';
import { myTheme } from '../../common/theme';
import { CssSize, TypeImageBackground } from '../../common/types';
import { useAppContext } from '../../context/appContext';
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

const StyledView = styled.View`
  position: absolute;
  top: 0;

  z-index: 200;

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

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
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

export const AppHeader: React.FC<Props> = (props) => {
  const { addSourcesCount } = useAppContext();

  return (
    <StyledView style={myTheme.shadow}>
      <StyledImageBackground
        source={require('../../assets/images/ui/header-bg.png')}
        resizeMode='cover'
        onLoadEnd={addSourcesCount}
      >
        <LeftContainer>
          <HeaderButton
            onPress={props.onPressLeftButton}
            icon={props.leftButtonIcon ?? <GoBackIcon />}
          />
        </LeftContainer>

        <TitleContainer>
          <TitleText>{cutLongString(props.title, 23)}</TitleText>
        </TitleContainer>

        <RightContainer>
          {props.onPressRightButton && (
            <HeaderButton
              onPress={props.onPressRightButton}
              icon={props.rightButtonIcon}
            />
          )}
        </RightContainer>
      </StyledImageBackground>
    </StyledView>
  );
};
