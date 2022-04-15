import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledText } from '../../components/ui/StyledText';
import { RootSignedInStackParamList } from '../../navigation/types';

type TypeNotFoundScreenProps = NativeStackScreenProps<
  RootSignedInStackParamList,
  'NotFound'
>;

export default function NotFoundScreen({
  navigation,
}: TypeNotFoundScreenProps) {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Страница не найдена.</StyledText>
      <TouchableOpacity
        onPress={() => navigation.replace('Home')}
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
