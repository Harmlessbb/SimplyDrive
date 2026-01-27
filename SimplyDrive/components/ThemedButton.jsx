import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Colors'
import React from 'react'

export default function ThemedButton({
  title,
  children,
  onPress,
  style,
  selected = false,
  tab = false,
}) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const showGradient = !tab || selected

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={
          showGradient
            ? [theme.buttonColourGradientA, theme.buttonColourGradientB]
            : ['transparent', 'transparent']
        }
        start={[0, 0]}
        end={[1, 0]}
        style={[
          styles.gradient,
          tab && !selected && {

          },
          style,
        ]}
      >
        <Text
          style={[
            styles.text,
            tab && !selected && { color: '#555' },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    
  },
})
