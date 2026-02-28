import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

export default function SatoshiReg({ children, style, ...props }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  console.log('Fonts object:', Fonts);

  return (

    <Text style={[{ fontFamily: 'Satoshi-Variable', fontSize: 18, fontWeight:'Medium' }, style]}>
      {children}
    </Text>

  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Variable', 
    fontWeight:'100'
    //fontSize: 24,
  },
});