import { LinkingOptions } from '@react-navigation/native';
import { RootSignedOutStackParamList } from '../types';
import * as Linking from 'expo-linking';

const prefix = Linking.makeUrl('/');

export const linking: LinkingOptions<RootSignedOutStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      NewPassword: 'reset/:token',
    },
  },
};
