import { Button, StyleSheet, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import ThemedView from '../components/ThemedView'

const goToCheckInPage = () => {
  router.push('/(dashboard)/home')
}

export default function Index() {
  return (

    <ImageBackground source={require('../assets/background-Lightmote.jpg')}  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>


      <Text style={{ textAlign: 'center', marginBottom: 50, marginTop: 250 }}>Please note this application is for display purposes only, and is missing features that will be present in the final product.</Text>


      <Button style={{ marginTop: 10, marginBottom: 10 }} title="Continue to application" onPress={goToCheckInPage} />

      <Text style={{ textAlign: 'center', textAlignVertical:'bottom', marginTop: 250 }} >Copyright © 2025 SimplyDriveUK</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})
