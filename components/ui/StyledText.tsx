import { StyleSheet, Text } from 'react-native';

export function StyledText(props: Text['props']) {
  return <Text {...props} style={[props.style, style.default]} />;
}

const style = StyleSheet.create({
  default: { fontFamily: 'roboto' },
});
