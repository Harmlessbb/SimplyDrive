import { Slot } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const _layout = () => {
  return (
    <View>
      <Slot styles={styles.container} />
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({

    container:{
        flex: 1
    }
})
