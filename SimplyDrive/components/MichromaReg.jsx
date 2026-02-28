import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

export default function MichromaReg({ children, style, ...props }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  console.log('Fonts object:', Fonts);

  return (
    <Text
      style={[styles.text, { color: theme.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Michroma-Regular', 
    fontSize: 26,
  },
});