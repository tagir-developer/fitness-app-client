/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import TabTwoScreen from '../screens/HomeScreen/HomeScreen';
import {
  RootSignedInStackParamList,
  RootSignedOutStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from './types';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator isSignedIn={false} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator<RootStackParamList>();
const SignedInStack = createNativeStackNavigator<RootSignedInStackParamList>();
const SignedOutStack =
  createNativeStackNavigator<RootSignedOutStackParamList>();

type TypeRootNavigatorProps = {
  isSignedIn: boolean;
};

// function RootNavigator(props: TypeRootNavigatorProps) {
function RootNavigator(props: TypeRootNavigatorProps) {
  return (
    <>
      {props.isSignedIn ? (
        <SignedInStack.Navigator>
          <SignedInStack.Screen name='Home' component={HomeScreen} />
        </SignedInStack.Navigator>
      ) : (
        <SignedOutStack.Navigator>
          <SignedOutStack.Screen name='SignIn' component={SignInScreen} />
          <SignedOutStack.Screen name='Register' component={RegisterScreen} />
        </SignedOutStack.Navigator>
      )}

      {/* <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Modal' component={ModalScreen} />
      </Stack.Group> */}
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName='TabOne'
//       screenOptions={{
//         tabBarActiveTintColor: Colors['light'].tint,
//       }}
//     >
//       <BottomTab.Screen
//         name='TabOne'
//         component={AuthScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}
//             >
//               <FontAwesome
//                 name='info-circle'
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name='TabTwo'
//         component={TabTwoScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
