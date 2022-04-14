import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText } from '../components/ui/StyledText';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Страница не найдена.</StyledText>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}
      >
        <StyledText style={styles.linkText}>
          Вернуться на домашний экран!
        </StyledText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
