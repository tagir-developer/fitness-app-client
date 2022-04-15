import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

type Props = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  title: string;
  style?: ViewStyle;
};

export function StyledButton(props: Props) {
  const { onPress, title, style } = props;
  return (
    <Pressable
      //   style={styles.button}
      onPress={onPress}
      style={[styles.button, props.style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontFamily: 'roboto',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.75,
    color: 'white',
  },
});
