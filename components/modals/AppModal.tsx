import { LinearGradient } from 'expo-linear-gradient';
import { Modal, ModalProps } from 'react-native';
import styled from 'styled-components/native';
import { TypeThemeProps } from '../../common/types';

type Props = ModalProps & {
  isOpen: boolean;
};

const ModalLayout = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View<TypeThemeProps>`
  width: 70%;
  height: auto;

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

export const AppModal: React.FC<Props> = (props) => (
  <Modal
    {...props}
    animationType='fade'
    transparent={true}
    visible={props.isOpen}
  >
    <ModalLayout>
      <ModalContainer>
        <LinearGradient colors={['#F8F8F8', '#3C3C3C']}>
          <ModalInner>{props.children}</ModalInner>
        </LinearGradient>
      </ModalContainer>
    </ModalLayout>
  </Modal>
);
