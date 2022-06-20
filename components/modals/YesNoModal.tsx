import { ModalProps, TouchableHighlightProps } from 'react-native';
import styled from 'styled-components/native';
import { TypeImageBackground, TypeThemeProps } from '../../common/types';
import { AppModal } from './AppModal';
import { SteelDivider } from '../common/SteelDivider';

type Props = ModalProps & {
  isOpen: boolean;
  title: string;
  message?: string;
  onPressYes: () => void;
  onPressNo: () => void;
  onPressCancel: () => void;
  yesMessage?: string;
  noMessage?: string;
  cancelMessage?: string;
};

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  width: 100%;
  height: auto;
`;

const TitleContainer = styled.View`
  width: 100%;
  min-height: 40px;

  border-bottom-width: 1px;
  border-bottom-color: #6c6c6c;

  padding: 10px 20px;
`;

const TitleText = styled.Text<TypeThemeProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: 17px;
  color: ${(props) => props.theme.colors.primaryText};

  text-align: center;
`;

const ContentContainer = styled.View`
  width: 100%;
  min-height: 40px;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: #f0f0f0;
  border-bottom-color: #6c6c6c;

  padding: 20px 20px;
`;

const ContentDivider = styled.View`
  width: 100%;
  height: 20px;
`;

const ContentText = styled.Text<TypeThemeProps>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => props.theme.colors.primaryText};

  text-align: center;
`;

const ButtonsContainer = styled.View`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const ModalButton = styled.TouchableHighlight.attrs(
  (props: TouchableHighlightProps) => ({
    activeOpacity: props.activeOpacity ? props.activeOpacity : 0.9,
    underlayColor: props.underlayColor ? props.underlayColor : '#00000022',
  })
)`
  width: 100%;
  height: 40px;

  padding: 10px 20px;
`;

export const YesNoModal: React.FC<Props> = ({
  title,
  message,
  onPressNo,
  onPressYes,
  onPressCancel,
  yesMessage,
  cancelMessage,
  noMessage,
  ...props
}) => (
  <AppModal {...props}>
    <StyledImageBackground
      source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
      resizeMode='repeat'
    >
      <TitleContainer>
        <TitleText>{title}</TitleText>
      </TitleContainer>

      <ContentContainer>
        {message && <ContentText>{message}</ContentText>}

        {message && props.children && <ContentDivider />}

        {props.children}
      </ContentContainer>

      <ButtonsContainer>
        <ModalButton onPress={onPressYes}>
          <TitleText>{yesMessage ?? 'Да'}</TitleText>
        </ModalButton>

        <SteelDivider />

        <ModalButton onPress={onPressNo}>
          <TitleText>{noMessage ?? 'Нет'}</TitleText>
        </ModalButton>

        <SteelDivider />

        <ModalButton onPress={onPressCancel}>
          <TitleText>{cancelMessage ?? 'Отмена'}</TitleText>
        </ModalButton>
      </ButtonsContainer>
    </StyledImageBackground>
  </AppModal>
);
