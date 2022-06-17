import { ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { CssSize, MarginProps } from '../../common/types';
import { useAppContext } from '../../context/appContext';

type Props = ViewProps &
  MarginProps & {
    w?: CssSize;
  };

const StyledImageBackground = styled.ImageBackground<Props>`
  width: ${(props) => props.w ?? '100%'};
  height: 20px;

  margin-top: ${(props) => props.mt ?? '0px'};
  margin-bottom: ${(props) => props.mb ?? '0px'};
  margin-left: ${(props) => props.ml ?? '0px'};
  margin-right: ${(props) => props.mr ?? '0px'};
`;

export const FlatlistTopDivider: React.FC<Props> = (props) => {
  const { addSourcesCount } = useAppContext();

  return (
    <StyledImageBackground
      {...props}
      source={require('../../assets/images/ui/barbell.jpg')}
      resizeMode='contain'
      onLoadEnd={addSourcesCount}
    />
  );
};
