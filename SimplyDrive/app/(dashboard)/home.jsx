import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Dimensions, Image, ImageBackground } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur';
import React from 'react'
import { Colors } from '../../constants/Colors'
//import Carousel from 'react-native-reanimated-carousel'
import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'

const Home = () => {

const vehicles = [
  { id: 1, name: 'Audi A3' },
  { id: 2, name: 'Golf GTI' },
  { id: 3, name: 'Model 3' },
]

const { width } = Dimensions.get('window')


const colorScheme = useColorScheme()
const theme = Colors[colorScheme] ?? Colors.light 

  return (

    <ScrollView style={{backgroundColor: theme.backgroundColour}} showsVerticalScrollIndicator={false}>

      <View style={styles.upperContainer}>
        <Text> Good morning! </Text>
        <Text> Ready to take care of your vehicle? </Text>
        <ThemedButton title="+ Add Vehicle" style={styles.addVehicleButton} onPress={() => router.push('/(dashboard)/bookings/newbooking')} /> 
      </View>
      
      <UIDevider/>

      <View style={styles.vehicleCarouselContainer}>
        <Text>Your Vehicles</Text>
        <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >

        {vehicles.map((v, i) => (
          <View key={i} style={{ width: width * 0.85, margin: 15 }}>
            <ThemedCard style={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
              <ImageBackground
                source={require('../../assets/CarPlaceHolderIMG.png')}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              >

                <View style={{flex: 0.6}}></View>
                <BlurView intensity={100} style={{ flex: 0.4, justifyContent: 'center', alignItems: 'start', BlurTint: 'systemChromeMaterial' }} >
                  <Text style={styles.vehicleTitle}> {v.name}</Text>
                  <Text style={styles.vehicleTitle}> Silver - ABC123 - 57,449 mi</Text>
                  <UIDevider/>
                  <ThemedButton title="Schedule Now" style={styles.bookButton} onPress={() => router.push('/(dashboard)/map')} />
                </BlurView>

              </ImageBackground>
            </ThemedCard>
          </View>
        ))}


        </ScrollView>

        <Text>Quick Book</Text>
      </View>


      <UIDevider/>

      <View style={styles.quickBookingContainer}>

        <ThemedCard style={{ padding: 20, borderRadius: 20, margin: 15, height: 20, backgroundColor: theme.cardColour }}>
        </ThemedCard>
        <ThemedCard style={{ padding: 20, borderRadius: 20, margin: 15, height: 20, backgroundColor: theme.cardColour }}>
        </ThemedCard>

        <Text>    Nearby Garages</Text>  
        <Text>    See all Garages</Text>  
      </View>

      <UIDevider/>

      <View style={styles.nearByGarageContainer}>
        <ThemedCard style={{ padding: 20, borderRadius: 20, margin: 15, height: 40, backgroundColor: theme.cardColour }}>
        </ThemedCard>
        <ThemedCard style={{ padding: 20, borderRadius: 20, margin: 15, height: 40, backgroundColor: theme.cardColour }}>
        </ThemedCard>
      </View>

    </ScrollView>
  )
}

export default Home;

const styles = StyleSheet.create({

  upperContainer:
  {
    height: 150,
    padding:12.5
  },

  addVehicleButton:
  {
    width:"40%",
    height: 45,
    marginTop:40,

  },

  vehicleCarouselContainer:
  {
    //backgroundColor: 'red',
    height: 450,
    padding:12.5
  },

    bookButton:
  {
    width:"50%",
    height: 45,
    marginTop:45,
    marginLeft: 10
  },
  quickBookingContainer:
  {
    height: 450,
    //backgroundColor: 'blue',
  },


    nearByGarageContainer:
  {
    height: 450,
    //backgroundColor: 'blue',
  },
  

})