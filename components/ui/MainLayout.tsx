import { ActivityIndicator } from 'react-native';
import { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useAppContext } from '../../context/appContext';
import { TypeImageBackground } from '../../common/types';

type TypeMainLayoutProps = {
  children: ReactNode;
  loading: boolean;
};

const MainWrapper = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
`;

const LoaderLayout = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: #110c39;

  z-index: 1000;
`;

const StyledImageBackground = styled.ImageBackground<TypeImageBackground>`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function MainLayout(props: TypeMainLayoutProps) {
  const { addSourcesCount } = useAppContext();

  return (
    <MainWrapper>
      {props.loading && (
        <LoaderLayout>
          <ActivityIndicator size='large' color='#4aa3ba' />
        </LoaderLayout>
      )}

      <StyledImageBackground
        source={require('../../assets/images/app-background.jpg')}
        resizeMode='cover'
        onLoadEnd={addSourcesCount}
      >
        {props.children}
      </StyledImageBackground>
    </MainWrapper>
  );
}
