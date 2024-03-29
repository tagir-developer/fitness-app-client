import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import {
  CssSize,
  MarginProps,
  PositionProps,
  TypeImageBackground,
  TypeThemeProps,
} from '../../common/types';
// import { useAppContext } from '../../context/appContext';

type Props = TouchableOpacityProps &
  MarginProps &
  PositionProps & {
    title: string;
    color?: string;
    subTitle?: string;
    fontSize?: CssSize;
    w?: CssSize;
    h?: CssSize;
  };

type ButtonTextProps = TypeThemeProps & {
  color?: string;
  fontSize?: CssSize;
};

type ContentViewProps = {
  subTitle?: string;
  h?: CssSize;
};

const RoundedTouchableOpacity = styled.TouchableOpacity<Props>`
  position: ${props => props.position ?? 'relative'};

  top: ${props => props.top ?? 'auto'};
  bottom: ${props => props.bottom ?? 'auto'};
  left: ${props => props.left ?? 'auto'};
  right: ${props => props.right ?? 'auto'};

  z-index: 100;

  width: ${props => props.w ?? props.theme.width};
  /* height: auto; */
  /* height: ${props => props.h ?? 'auto'} */
  max-height: ${props => props.h ?? '67px'}

  /* background: ${props => props.theme.colors.empty}; */
  border-radius: 52px;

  overflow: hidden;

  margin-top: ${props => props.mt ?? '0px'};
  margin-bottom: ${props => props.mb ?? '0px'};
  margin-left: ${props => props.ml ?? '0px'};
  margin-right: ${props => props.mr ?? '0px'};
`;

const ButtonText = styled.Text<ButtonTextProps>`
  font-family: ${props => props.theme.fonts.bold};
  font-weight: 700;
  font-size: ${props => props.fontSize ?? '15px'};
  color: ${props => props.color ?? props.theme.colors.primaryText};
`;

const SubtitleText = styled.Text`
  font-family: ${props => props.theme.fonts.normal};
  font-size: 14px;
  color: #5c5c5c;

  margin-top: 10px;
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
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
  /* height: ${props => (props.subTitle ? '77px' : props.h ?? '57px')}; */
  /* height: ${props => (props.subTitle ? '77px' : '45px' ?? '57px')}; */
  height: 100%;
  /* max-height: 57px; */
`;

export const AppButton: React.FC<Props> = props => {
  // const { addSourcesCount } = useAppContext();

  return (
    <RoundedTouchableOpacity {...props} activeOpacity={0.9}>
      <LinearGradient
        colors={['#F8F8F8', '#3C3C3C']}
        style={{ borderRadius: props.h ? 10 : 30 }}
      >
        <StyledInnerView>
          <ContentView subTitle={props.subTitle} h={props.h}>
            <StyledImageBackground
              source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
              resizeMode='repeat'
              // onLoadEnd={addSourcesCount}
            >
              <ButtonText color={props.color} fontSize={props.fontSize}>
                {props.title.toUpperCase()}
              </ButtonText>

              {props.subTitle && <SubtitleText>{props.subTitle}</SubtitleText>}
            </StyledImageBackground>
          </ContentView>
        </StyledInnerView>
      </LinearGradient>
    </RoundedTouchableOpacity>
  );
};
