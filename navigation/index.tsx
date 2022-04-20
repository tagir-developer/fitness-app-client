import { FontAwesome } from '@expo/vector-icons';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen/NotFoundScreen';
import {
  RootSignedInStackParamList,
  RootSignedOutStackParamList,
} from './types';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { useAuthContext } from '../context/authContext';
import AboutScreen from '../screens/AboutScreen/AboutScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const SignedInStack = createNativeStackNavigator<RootSignedInStackParamList>();
const SignedOutStack =
  createNativeStackNavigator<RootSignedOutStackParamList>();

function RootNavigator() {
  const { loggedIn } = useAuthContext();

  return (
    <>
      {loggedIn ? (
        <SignedInStack.Navigator>
          <SignedInStack.Screen name='Home' component={HomeScreen} />
          <SignedInStack.Screen name='About' component={AboutScreen} />
          <SignedInStack.Screen name='NotFound' component={NotFoundScreen} />
        </SignedInStack.Navigator>
      ) : (
        <SignedOutStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <SignedOutStack.Screen name='SignIn' component={SignInScreen} />
          <SignedOutStack.Screen name='Register' component={RegisterScreen} />
        </SignedOutStack.Navigator>
      )}
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
