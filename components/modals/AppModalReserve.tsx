import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  Modal,
  TouchableOpacityProps,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginProps, TypeThemeProps } from '../../common/types';

type Props = TouchableOpacityProps &
  MarginProps & {
    w?: CssSize;
    h?: CssSize;
    isOpen: boolean;
  };

type ModalContainerProps = TypeThemeProps & {
  w?: CssSize;
  h?: CssSize;
};

const ModalLayout = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View<ModalContainerProps>`
  width: ${(props) => props.w ?? '70%'};
  height: ${(props) => props.h ?? 'auto'};

  background: ${(props) => props.theme.colors.empty};

  border-radius: 15px;

  overflow: hidden;
`;

const ModalInner = styled.View`
  height: auto;
  overflow: hidden;

  border-radius: 13px;

  margin: 2px;
`;

const StyledImageBackground = styled.ImageBackground`
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

export const AppModal: React.FC<Props> = (props) => (
  <Modal
    {...props}
    animationType='fade'
    transparent={true}
    visible={props.isOpen}
    // onRequestClose={() => {
    //   Alert.alert('Modal has been closed.');
    //   setModalVisible(!modalVisible);
    // }}
  >
    <ModalLayout>
      <ModalContainer>
        <LinearGradient colors={['#F8F8F8', '#3C3C3C']}>
          <ModalInner>
            <StyledImageBackground
              source={require('../../assets/images/ui/home-menu-item-bg.jpg')}
              resizeMode='repeat'
            >
              <TitleContainer>
                <TitleText>Заголовок</TitleText>
              </TitleContainer>

              <ContentContainer>
                <ContentText>
                  Вы действительно хотите удалить карточку?
                </ContentText>
              </ContentContainer>

              <ButtonsContainer>
                <ModalButton>
                  <TitleText>Отмена</TitleText>
                </ModalButton>

                <ButtonsDivider />

                <ModalButton>
                  <TitleText>Ок</TitleText>
                </ModalButton>
              </ButtonsContainer>
            </StyledImageBackground>
          </ModalInner>
        </LinearGradient>
      </ModalContainer>
    </ModalLayout>
  </Modal>
);
