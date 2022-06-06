import { ModalProps } from 'react-native';
import styled from 'styled-components/native';
import { TypeImageBackground, TypeThemeProps } from '../../common/types';
import { AppModal } from './AppModal';
import omit from 'lodash.omit';

type Props = ModalProps & {
  isOpen: boolean;
  title: string;
  message?: string;
  onPressOk: () => void;
  onPressCancel?: () => void;
  okMessage?: string;
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
  flex-direction: row;
  align-items: center;

  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const ModalButton = styled.TouchableOpacity`
  flex: 1;

  padding: 10px 20px;
`;

const ButtonsDivider = styled.View`
  width: 1px;
  height: 80%;

  background-color: #878787;
`;

export const ConfirmModal: React.FC<Props> = (props) => (
  <AppModal
    {...omit(
      props,
      'title',
      'message',
      'onPressOk',
      'onPressCancel',
      'okMessage',
      'cancelMessage'
    )}
  >
    <StyledImageBackground
      source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
      resizeMode='repeat'
    >
      <TitleContainer>
        <TitleText>{props.title}</TitleText>
      </TitleContainer>

      <ContentContainer>
        {props.message && <ContentText>{props.message}</ContentText>}

        {props.message && props.children && <ContentDivider />}

        {props.children}
      </ContentContainer>

      {props.onPressCancel ? (
        <ButtonsContainer>
          <ModalButton onPress={props.onPressCancel} activeOpacity={0.9}>
            <TitleText>{props.cancelMessage ?? 'Отмена'}</TitleText>
          </ModalButton>

          <ButtonsDivider />

          <ModalButton onPress={props.onPressOk} activeOpacity={0.9}>
            <TitleText>{props.okMessage ?? 'Ок'}</TitleText>
          </ModalButton>
        </ButtonsContainer>
      ) : (
        <ButtonsContainer>
          <ModalButton onPress={props.onPressOk}>
            <TitleText>{props.okMessage ?? 'Ок'}</TitleText>
          </ModalButton>
        </ButtonsContainer>
      )}
    </StyledImageBackground>
  </AppModal>
);
