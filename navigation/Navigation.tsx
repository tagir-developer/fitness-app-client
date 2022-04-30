import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as React from 'react';
import { linking } from './linking/linking';
import RootNavigator from './RootNavigator';

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme} linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}
