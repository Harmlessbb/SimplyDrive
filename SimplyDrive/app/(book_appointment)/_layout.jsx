import { Slot, usePathname, router } from 'expo-router'
import { StyleSheet, Text, Touchable, View, useColorScheme, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../constants/Colors'
import CustomHeader from '../../components/CustomHeader'
import ThemedButton from '../../components/ThemedButton'
import UIDevider from '../../components/UIDevider'
import React from 'react'

const _layout = () => {

    const pathname = usePathname()

    const showButton = pathname === '/garageDetails'
    const showNewBookingProgess = pathname === '/newBookings'

    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    console.log(colorScheme)

    const FloatingButton = () => {
        return (
        <ThemedButton 
            title="Schedule Now"
            style={{width: 300, height: 50, alignSelf: 'center', marginBottom: 55,}}
            onPress= {() => router.push('/(book_appointment)/newBookings')}
            />

        )
    }


    return (

    <View style={{flex : 1}}> 

        <CustomHeader />

        <Slot />

        {showButton && (
            <View style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%',}}>
                <FloatingButton/>
            </View>
        )}

    </View>
    )
}

export default _layout

const styles = StyleSheet.create({

})