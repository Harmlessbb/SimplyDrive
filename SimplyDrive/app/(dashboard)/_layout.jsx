import { StyleSheet, createContext } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomHeader from '../../components/CustomHeader'
import {VehicleProvider} from '../../context/VehicleContext'


const _layout = () => {
  return (
    <VehicleProvider>
      <Tabs
        screenOptions={{
          header: () => <CustomHeader />,
          
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="bookings" />
        <Tabs.Screen name="map" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </VehicleProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})
