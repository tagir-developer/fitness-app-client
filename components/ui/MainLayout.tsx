import { ActivityIndicator, View } from 'react-native';
import { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useAppContext } from '../../context/appContext';

type TypeMainLayoutProps = {
  children: ReactNode;
};

type ImageBackgroundProps = {
  children: ReactNode;
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

const StyledImageBackground = styled.ImageBackground<ImageBackgroundProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function MainLayout(props: TypeMainLayoutProps) {
  const { addLoadingSource, removeLoadingSource, loadingSourcesStack } =
    useAppContext();

  const sourcesLoading = loadingSourcesStack.length > 0;
  return (
    <MainWrapper>
      {sourcesLoading && (
        <LoaderLayout>
          <ActivityIndicator size='large' color='#4aa3ba' />
        </LoaderLayout>
      )}

      <StyledImageBackground
        source={require('../../assets/images/app-background.jpg')}
        resizeMode='cover'
        onLoadStart={() =>
          addLoadingSource('../../assets/images/app-background.jpg')
        }
        onLoadEnd={() =>
          removeLoadingSource('../../assets/images/app-background.jpg')
        }
      >
        {props.children}
      </StyledImageBackground>
    </MainWrapper>
  );
}
