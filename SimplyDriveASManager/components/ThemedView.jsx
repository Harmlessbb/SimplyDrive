import { StyleSheet, View } from 'react-native'
import React from 'react'

export default function ThemedView({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})