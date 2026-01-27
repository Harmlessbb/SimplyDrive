import { Button, StyleSheet, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import ThemedView from '../components/ThemedView'

const goToCheckInPage = () => {
  router.push('/(dashboard)/home')
}

export default function Index() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ textAlign: 'center', marginTop: 250 }}>Hello, World!</Text>

      <Text style={{ textAlign: 'center', marginBottom: 50 }}>Please note this application is still in active development, please expect bugs and incomplete features.</Text>


      <Button style={{ marginTop: 10, marginBottom: 10 }} title="Continue to application" onPress={goToCheckInPage} />

      <Text style={{ textAlign: 'center', textAlignVertical:'bottom', marginTop: 250 }} >Copyright © 2025 SimplyDriveUK</Text>
    </ThemedView>
  )
}

const styles = StyleSheet.create({})
