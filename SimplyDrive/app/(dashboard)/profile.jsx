import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

const profile = () => {
  return (
    <ImageBackground source={require('../../assets/background-Lightmote.jpg')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.bgOverlay} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10}}> Profile Screen </Text>
      <Text style={{ fontSize: 24, fontWeight: 'regular'}}> Work In Progress </Text>
    </ImageBackground>
  )
}

export default profile

const styles = StyleSheet.create({  
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },
})