import { LinearGradient } from 'expo-linear-gradient';
import { ReactChild } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { css } from 'styled-components';
import {
  CssSize,
  MarginProps,
  PositionProps,
  TypeThemeProps,
} from '../../common/types';

type Props = TouchableOpacityProps &
  MarginProps &
  PositionProps & {
    title: string;
    color?: string;
    w?: CssSize;
    subTitle?: string;
    fontSize?: CssSize;
  };

type ButtonTextProps = TypeThemeProps & {
  color?: string;
  fontSize?: CssSize;
};

type ImageBackgroundProps = {
  children: ReactChild;
};

type ContentViewProps = {
  subTitle?: string;
};

const RoundedTouchableOpacity = styled.TouchableOpacity<Props>`
  position: ${(props) => props.position ?? 'relative'};

  top: ${(props) => props.top ?? 'auto'};
  bottom: ${(props) => props.bottom ?? 'auto'};
  left: ${(props) => props.left ?? 'auto'};
  right: ${(props) => props.right ?? 'auto'};

  z-index: 100;

  width: ${(props) => props.w ?? props.theme.width};
  height: auto;

  background: ${(props) => props.theme.colors.empty};
  border-radius: 52px;

  overflow: hidden;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: ${(props) => props.fontSize ?? '15px'};
  color: ${(props) => props.color ?? props.theme.colors.primaryText};
`;

const SubtitleText = styled.Text`
  font-family: ${(props) => props.theme.fonts.normal};
  font-size: 14px;
  color: #5c5c5c;

  margin-top: 10px;
`;

const StyledImageBackground = styled.ImageBackground<ImageBackgroundProps>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledInnerView = styled.View`
  height: auto;
  overflow: hidden;

  border-radius: 52px;

  margin: 2px;
`;

const ContentView = styled.View<ContentViewProps>`
  height: ${(props) => (props.subTitle ? '77px' : '57px')};
`;

export const AppButton: React.FC<Props> = (props) => (
  <RoundedTouchableOpacity {...props} activeOpacity={0.9}>
    <LinearGradient
      colors={['#F8F8F8', '#3C3C3C']}
      style={{ borderRadius: 30 }}
    >
      <StyledInnerView>
        <ContentView subTitle={props.subTitle}>
          <StyledImageBackground
            source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
            resizeMode='repeat'
          >
            <>
              <ButtonText color={props.color} fontSize={props.fontSize}>
                {props.title.toUpperCase()}
              </ButtonText>
              {props.subTitle && <SubtitleText>{props.subTitle}</SubtitleText>}
            </>
          </StyledImageBackground>
        </ContentView>
      </StyledInnerView>
    </LinearGradient>
  </RoundedTouchableOpacity>
);
