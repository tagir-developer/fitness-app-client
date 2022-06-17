import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import {
  CssSize,
  MarginProps,
  TypeImageBackground,
  TypeThemeProps,
} from '../../common/types';
import { AppFlex } from '../ui/AppFlex';
import Swipeout from 'react-native-swipeout';
import ShowInfoIcon from '../../common/icons/ShowInfoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import ActiveCardIcon from '../../common/icons/ActiveCardIcon';
import { cutLongString } from '../../common/helpers/cutLongString';
import { getRightSwipeoutButtons } from '../../common/helpers/getSwipeoutBtns';

type Props = TouchableOpacityProps &
  MarginProps & {
    title: string;
    color?: string;
    fontSize?: CssSize;
    w?: CssSize;
    isActive?: boolean;
    description: string;
    deleteHandler?: () => void;
    copyHandler?: () => void;
    infoPressHandler: () => void;
    disableSwipeoutButtons?: boolean;
  };

type CardTextProps = TypeThemeProps & {
  color?: string;
  fontSize?: CssSize;
};

const CardContainer = styled.TouchableOpacity<Props>`
  width: 100%;
  height: 63px;

  background: ${(props) => props.theme.colors.empty};

  border-top-width: 2px;
  border-bottom-width: 2px;
  border-top-color: ${(props) => (props.isActive ? '#565656' : '#f0f0f0')};
  border-bottom-color: ${(props) => (props.isActive ? '#5b5b5b' : '#6c6c6c')};

  overflow: hidden;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const CardTitle = styled.Text<CardTextProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.color ?? props.theme.colors.primaryText};
`;

const CardDescription = styled.Text<CardTextProps>`
  font-family: ${(props) => props.theme.fonts.normal};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color ?? props.theme.colors.secondaryText};
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  width: 100%;
  height: 59px;
`;

const CardContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const InfoContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoCard: React.FC<Props> = (props) => {
  const rightButtons = getRightSwipeoutButtons(
    props.copyHandler,
    props.deleteHandler
  );

  const innerContent: JSX.Element = (
    <>
      <AppFlex flex='0.85' align='flex-start'>
        <AppFlex direction='column' align='flex-start' pl='20px'>
          <CardTitle color={props.color} fontSize={props.fontSize}>
            {cutLongString(props.title, 28)}
          </CardTitle>

          <CardDescription color={props.color} fontSize={props.fontSize}>
            {props.description}
          </CardDescription>
        </AppFlex>
      </AppFlex>

      <AppFlex flex='0.15'>
        <InfoContainer onPress={props.infoPressHandler} activeOpacity={0.7}>
          {props.isActive ? <ActiveCardIcon /> : <ShowInfoIcon />}
        </InfoContainer>
      </AppFlex>
    </>
  );

  return (
    <Swipeout right={rightButtons} disabled={!rightButtons.length}>
      <CardContainer {...props} activeOpacity={1}>
        <StyledImageBackground
          source={require('../../assets/images/ui/w-100-steel-bg.jpg')}
          resizeMode='repeat'
        >
          <CardContent>
            {props.isActive ? (
              <LinearGradient
                colors={['#3131318b', '#3c3c3c21']}
                style={{ flex: 1, flexDirection: 'row' }}
              >
                {innerContent}
              </LinearGradient>
            ) : (
              innerContent
            )}
          </CardContent>
        </StyledImageBackground>
      </CardContainer>
    </Swipeout>
  );
};
