import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../constants/Colors'
import React from 'react'

export default function ThemedButtonSecondary({
  title,
  children,
  onPress,
  style,

}) {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View style={{flex: 1}}>

      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.button}>

          <Text
            style={[
              {borderColor: theme.borderColour},
              styles.text,
              style,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {title}
          </Text>

      </TouchableOpacity>

    </View>
  )
}



const styles = StyleSheet.create({

  text: {

    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    
  },

  button: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#55555500',
    borderWidth: 1.5,
    borderRadius: 10,
  }

})
