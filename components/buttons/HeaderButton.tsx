import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { TypeImageBackground } from '../../common/types';
import { useAppContext } from '../../context/appContext';

type Props = TouchableOpacityProps & {
  icon?: JSX.Element;
};

const RoundedTouchableOpacity = styled.TouchableOpacity<Props>`
  width: 60px;
  height: 60px;

  background: ${(props) => props.theme.colors.empty};
  border-radius: 50px;
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const HeaderButton: React.FC<Props> = (props) => {
  const { addSourcesCount } = useAppContext();

  return (
    <RoundedTouchableOpacity {...props} activeOpacity={0.9}>
      <StyledImageBackground
        source={require('../../assets/images/ui/header-button.png')}
        resizeMode='cover'
        onLoadEnd={addSourcesCount}
      >
        {props.icon}
      </StyledImageBackground>
    </RoundedTouchableOpacity>
  );
};
