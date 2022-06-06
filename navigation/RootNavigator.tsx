import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen/NotFoundScreen';
import {
  RootSignedInStackParamList,
  RootSignedOutStackParamList,
} from './types';
import SignInScreen from '../screens/Auth/SignInScreen/SignInScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AboutScreen from '../screens/AboutScreen/AboutScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen/ResetPasswordScreen';
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen/NewPasswordScreen';
import AllProgramsScreen from '../screens/trainingPrograms/AllProgramsScreen/AllProgramsScreen';
import CreateProgramScreen from '../screens/trainingPrograms/CreateProgramScreen/CreateProgramScreen';

const Stack = createNativeStackNavigator<RootSignedInStackParamList>();
const SignedOutStack =
  createNativeStackNavigator<RootSignedOutStackParamList>();

export default function RootNavigator() {
  // const { loggedIn } = useAuthContext();

  // ! Временно переведем в значение true чтобы не авторизоваться каждый раз
  const loggedIn = true;

  return (
    <>
      {loggedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#140f2a',
            },
          }}
        >
          <Stack.Group
          // screenOptions={{
          //   headerShown: false,
          //   contentStyle: {
          //     backgroundColor: '#140f2a',
          //   },
          // }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='About' component={AboutScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name='AllPrograms' component={AllProgramsScreen} />
            <Stack.Screen
              name='CreateProgram'
              component={CreateProgramScreen}
            />
          </Stack.Group>

          <Stack.Screen name='NotFound' component={NotFoundScreen} />
        </Stack.Navigator>
      ) : (
        <SignedOutStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000000',
            },
          }}
        >
          <SignedOutStack.Screen name='SignIn' component={SignInScreen} />
          <SignedOutStack.Screen name='Register' component={RegisterScreen} />
          <SignedOutStack.Screen
            name='ResetPassword'
            component={ResetPasswordScreen}
          />
          <SignedOutStack.Screen
            name='NewPassword'
            component={NewPasswordScreen}
          />
        </SignedOutStack.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  test: {
    width: '100%',
    height: 200,
    backgroundColor: 'red',
  },
});

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
