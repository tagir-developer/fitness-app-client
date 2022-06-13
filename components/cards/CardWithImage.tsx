import { LinearGradient } from 'expo-linear-gradient';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { cutLongString } from '../../common/helpers/cutLongString';
import ActiveGreenCheckbox from '../../common/icons/activeGreenCheckbox';
import {
  CssSize,
  MarginProps,
  TypeImageBackground,
  TypeThemeProps,
} from '../../common/types';
import { ShapeWithGradientBorder } from '../common/ShapeWithGradientBorder';
import { AppFlex } from '../ui/AppFlex';

type Props = TouchableOpacityProps &
  MarginProps & {
    title: string;
    color?: string;
    fontSize?: CssSize;
    w?: CssSize;
    subTitle?: string;
    onCheckHandler: ((event: GestureResponderEvent) => void) | undefined;
    isActive: boolean;
  };

type CardTextProps = TypeThemeProps & {
  color?: string;
  fontSize?: CssSize;
};

type CardImageProps = {
  sourceLink?: string;
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

const CardText = styled.Text<CardTextProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 400;
  font-size: 18px;
  color: ${(props) => props.color ?? props.theme.colors.primaryText};
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  width: 100%;
  height: 59px;
`;

const CardImage = styled.ImageBackground<CardImageProps>`
  width: 100%;
  height: 100%;
`;

const CardContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: center;
`;

export const CardWithImage: React.FC<Props> = (props) => (
  <CardContainer {...props} activeOpacity={1}>
    <StyledImageBackground
      source={require('../../assets/images/ui/w-100-steel-bg.jpg')}
      resizeMode='repeat'
    >
      <CardContent>
        <AppFlex flex='0.2'>
          <ShapeWithGradientBorder w='52px' h='52px'>
            <CardImage
              source={require('../../assets/images/ui/card-icons/programs/basic.jpg')}
              resizeMode='cover'
            />
          </ShapeWithGradientBorder>
        </AppFlex>

        <AppFlex flex='0.6' align='flex-start'>
          <CardText color={props.color} fontSize={props.fontSize}>
            {cutLongString(props.title, 42)}
          </CardText>
        </AppFlex>

        <AppFlex flex='0.2'>
          <ShapeWithGradientBorder
            onPress={props.onCheckHandler}
            w='35px'
            h='35px'
          >
            <LinearGradient
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={['#414141', '#5f5f5f']}
            >
              {props.isActive && <ActiveGreenCheckbox />}
            </LinearGradient>
          </ShapeWithGradientBorder>
        </AppFlex>
      </CardContent>
    </StyledImageBackground>
  </CardContainer>
);
