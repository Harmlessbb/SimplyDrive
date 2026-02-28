import { StyleSheet, createContext, Image } from 'react-native'
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
          tabBarShowLabel: false,
        }}
      >
      <Tabs.Screen 
        name="home" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/home-icon.png')} 
              style={{ width: 26, height: 26, tintColor: focused ? 'tomato' : 'gray', resizeMode: 'contain', marginTop: 5  }}
            />
          )
        }}
      />

      <Tabs.Screen 
        name="bookings" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/calendar-icon.png')} 
              style={{ width: 26, height: 26, tintColor: focused ? 'tomato' : 'gray', resizeMode: 'contain', marginTop: 5  }}
            />
          )
        }}
      />

      <Tabs.Screen 
        name="map" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/map-icon.png')} 
              style={{ width: 26, height: 26, tintColor: focused ? 'tomato' : 'gray', resizeMode: 'contain', marginTop: 5  }}
            />
          )
        }}
      />

      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../../assets/profile-icon.png')} 
              style={{ width: 26, height: 26, tintColor: focused ? 'tomato' : 'gray', resizeMode: 'contain', marginTop: 5  }}
            />
          )
        }}
      />
      </Tabs>
    </VehicleProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})
