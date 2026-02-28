import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function UIDevider({ style }) {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light 

  return (
    <View
      style={[
        styles.devider,
        { backgroundColor: theme.deviderColour },
        style,
      ]}
    />
  )
}


const styles = StyleSheet.create({

    devider:
    {
        alignSelf:'center',
        justifyContent:'center',
        height: 1.5,
        width: '90%',
        borderRadius:0
    }

})