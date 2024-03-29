import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { linking } from './linking/linking';
import RootNavigator from './RootNavigator';

export default function Navigation() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}
