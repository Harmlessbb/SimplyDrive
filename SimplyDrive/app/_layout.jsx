import { Slot } from 'expo-router'
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import React from 'react'

const RootLayout = () => {

    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    console.log(colorScheme)

    return (

    <View style={{flex : 1}}> 
       
        <Slot />
        
    </View>
    )
}

export default RootLayout

const styles = StyleSheet.create({


})