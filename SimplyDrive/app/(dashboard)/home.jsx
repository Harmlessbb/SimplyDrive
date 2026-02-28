import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Dimensions, Image, ImageBackground } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur';
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Fonts } from '../../constants/Fonts';
//import Carousel from 'react-native-reanimated-carousel'
import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import MichromaReg from '../../components/MichromaReg';
import SatoshiReg from '../../components/SatoshiReg';
import SatoshiVar from '../../components/SatoshiVar';

const Home = () => {

const vehicles = [
  { id: 1, name: 'Audi A3' },
  { id: 2, name: 'Golf GTI' },
  { id: 3, name: 'Model 3' },
]

const { width } = Dimensions.get('window')

const QuickBookCard = ({ item }) => {
  return (        

  <ThemedCard style={{ padding: 0, borderRadius: 20, margin: 15, overflow: 'hidden', height: 200 }}>

      <ImageBackground
        source={require('../../assets/background-Lightmote.jpg')}
        style={{ flex: 1}}
        imageStyle={{ opacity: 0.2 }}
        resizeMode="cover"
        backgroundColor= 'transparent'
        >

        <View style={{flex:1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 15}}>

          <View style={{flex: 0.4, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', borderRadius: 15}}>
            <View style={{width: 55, height: 55, backgroundColor: '#FF6B35', borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../assets/mail-icon.png')} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />
            </View>
          </View>

          <Text style={{flex: 0.2, fontSize: 18, fontWeight: 'bold', marginTop: 20}}>Oil Change</Text>

          <Text style={{flex: 0.2, fontSize: 14, color: 'gray'}}>30 min</Text>

          <TouchableOpacity onPress={() => router.push('/(book_appointment)/garageDetails')} style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'row'}}>

            <View style={{flex: 1, height: '100%'}}>
              <Text style={{color: '#FF6B35', fontWeight: 'bold', fontSize: 16, marginTop: 10}}> Book your appointment</Text>
            </View>

          </TouchableOpacity>

        </View>

      </ImageBackground>

  </ThemedCard>)
}


const colorScheme = useColorScheme()
const theme = Colors[colorScheme] ?? Colors.light 

  return (

    <ScrollView style={{backgroundColor: theme.backgroundColour}} showsVerticalScrollIndicator={false}>
      <ImageBackground source={require('../../assets/background-Lightmote.jpg')} style={{ flex: 1, opacity: 2}}>
      <View style={styles.bgOverlay} />
      <View style={{flex:1}}>
      <View style={styles.upperContainer}>
        <MichromaReg>Good morning! </MichromaReg>
        <SatoshiVar style={{fontSize:18}}>Ready to take care of your vehicle? </SatoshiVar>
        <ThemedButton title="+ Add Vehicle" style={styles.addVehicleButton} /> 
      </View>
      
      <UIDevider/>

      <View style={styles.vehicleCarouselContainer}>
        <SatoshiReg style={{fontWeight:'bold'}}>Your Vehicles</SatoshiReg>
        <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >

        {vehicles.map((v, i) => (
          <View key={i} style={{ width: width * 0.89, margin: 10, elevation: 10 }}>
            <ThemedCard style={{ padding: 0, borderRadius: 20, overflow: 'hidden' }}>
              <ImageBackground
                source={require('../../assets/car-placeholder-img.png')}
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              >

                <View style={{flex: 0.6}}></View>

                  <BlurView
                    intensity={100}
                    style={{
                      flex: 0.4,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding:10
                    }}
                  >
                    <Text style={[styles.vehicleTitle, { fontSize: 20, fontFamily:'Michroma-Regular', color:'#ffffff' }]}>
                      {v.name}
                    </Text>
                    <Text style={[styles.vehicleTitle,{ fontSize: 18, fontFamily:'Satoshi-Regular', color:'#ffffff'  }]}>
                      Silver - ABC123 - 57,449 mi
                    </Text>

                    <UIDevider  style={{marginTop: 10, marginBottom: 10}}/>
                    
                    <ThemedButton
                      title="Schedule Now"
                      style={styles.bookButton}
                      onPress={() => router.push('/(dashboard)/map')}
                    />
                  </BlurView>

              </ImageBackground>
            </ThemedCard>
          </View>
        ))}


        </ScrollView>

        <SatoshiReg style={{fontWeight:'bold', marginLeft:5, marginTop: 5}}>Quick Book</SatoshiReg>
      </View>


      <UIDevider/>

      <View style={styles.quickBookingContainer}>

        <QuickBookCard />
        <QuickBookCard />


        <View style={{padding: 10}}>
          <SatoshiReg style={{fontSize: 22, marginTop: 10}}>Nearby Garages</SatoshiReg>  
          <TouchableOpacity onPress={() => router.push('/(dashboard)/map')}>
          <SatoshiVar style={{color: '#FF6B35', fontWeight: 'bold', fontSize: 16, marginTop: 5}}>See all Garages</SatoshiVar>  
          </TouchableOpacity>
        </View>


      </View>

      <UIDevider/>

      <View style={styles.nearByGarageContainer}>


      </View>

        </View>
      </ImageBackground>
    </ScrollView>
  )
}

export default Home;

const styles = StyleSheet.create({

  upperContainer:
  {
    height: 150,
    padding:10
  },

  addVehicleButton:
  {
    width:"40%",
    height: 45,
    marginTop:10,

  },

  vehicleCarouselContainer:
  {
    //backgroundColor: 'red',
    height: 480,
    padding:12.5
  },

    bookButton:
  {
    width:"50%",
    height: 45,
    marginTop:0,
    marginLeft: 10
  },

  quickBookingContainer:
  {
    flex: 0.4,
    //backgroundColor: 'blue',
  },


    nearByGarageContainer:
  {
    height: 450,
    //backgroundColor: 'blue',
  },
  
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },
})