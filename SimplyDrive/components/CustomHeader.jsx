import { View, Text, Image, Pressable, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, usePathname } from 'expo-router'
import { Colors } from '../constants/Colors'

export default function CustomHeader() {
  
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light 
  const insets = useSafeAreaInsets()
  const pathname = usePathname() 
  return (
    <View style={[styles.container, { paddingTop: insets.top }, {backgroundColor: theme.headerColour}]}>

     <Image
        source={require('../assets/Logo-dark-H-noBG.png')}
        style={{width: 215, height: 70}}
        marginLeft={'5'}
     ></Image>

    <TouchableOpacity style={[styles.notifContainer, {alignContent: 'center', justifyContent: 'center'}]}>
             <Image
        source={require('../assets/notificationicon.png')}
        style={{width: '55%', height: '55%', alignSelf: 'center'}}
     ></Image>
    </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 110, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5412d',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  notifContainer:
  {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#e5412d',
    borderWidth: 1.25
  }

})
