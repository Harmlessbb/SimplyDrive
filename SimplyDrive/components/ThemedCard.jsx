import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function ThemedCard({ children, style }) {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light 

  return (
    <View style={[styles.container, { backgroundColor: theme.cardColour }, style]}>
      {children}
    </View>
  );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        overflow: 'hidden',
        //padding: 16,
        borderRadius: 20,

    }

})