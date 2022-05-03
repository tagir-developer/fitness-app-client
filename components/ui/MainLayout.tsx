import { ImageBackground, StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';

type TypeMainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: TypeMainLayoutProps) {
  return (
    <ImageBackground
      source={require('../../assets/images/app-background.jpg')}
      resizeMode='cover'
      style={styles.container}
    >
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
