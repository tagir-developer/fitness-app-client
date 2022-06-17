import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import RightArrow from '../../common/icons/rightArrow';
import {
  CssSize,
  MarginProps,
  TypeImageBackground,
  TypeThemeProps,
} from '../../common/types';
import { AppFlex } from '../ui/AppFlex';
import Swipeout, { SwipeoutButtonProperties } from 'react-native-swipeout';
import DeleteCardIcon from '../../common/icons/DeleteCardIcon';
import { cutLongString } from '../../common/helpers/cutLongString';
import CopyCardIcon from '../../common/icons/CopyCardIcon';
import {
  getLeftSwipeoutButtons,
  getRightSwipeoutButtons,
} from '../../common/helpers/getSwipeoutBtns';

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
    editHandler?: () => void;
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
  border-top-color: #f0f0f0;
  border-bottom-color: #6c6c6c;

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

export const SimpleCard: React.FC<Props> = (props) => {
  const rightButtons = getRightSwipeoutButtons(
    props.copyHandler,
    props.deleteHandler
  );

  const leftButtons = getLeftSwipeoutButtons(props.editHandler);

  return (
    <Swipeout
      right={rightButtons}
      left={leftButtons}
      disabled={!rightButtons.length && !leftButtons.length}
    >
      <CardContainer {...props} activeOpacity={1}>
        <StyledImageBackground
          source={require('../../assets/images/ui/w-100-steel-bg.jpg')}
          resizeMode='repeat'
        >
          <CardContent>
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
              <RightArrow />
            </AppFlex>
          </CardContent>
        </StyledImageBackground>
      </CardContainer>
    </Swipeout>
  );
};
