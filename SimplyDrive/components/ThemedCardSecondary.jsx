import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Colors'
import React from 'react'

export default function ThemedCardSecondary({
  title,
  children,
  onPress,
  style,
  selected = false,
  tab = false,
}) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light



  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[
          theme.themedCardSecondaryGradientA,
          theme.themedCardSecondaryGradientB,
        ]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  )
}



const styles = StyleSheet.create({

container: {
    flex: 1,
    overflow: 'hidden',
   },

  gradient: {
    flex: 1,
    borderRadius: 20,
  },

  text: {
    color: 'white',
    fontWeight: '600',
    
  },
})
