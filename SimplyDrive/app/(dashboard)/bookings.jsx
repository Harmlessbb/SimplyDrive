import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Dimensions, Image, ImageBackground } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur';
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
//import Carousel from 'react-native-reanimated-carousel'
import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedButtonSecndary from '../../components/ThemedButtonSecondary'
import ThemedCard from '../../components/ThemedCard'
import ThemedCardSecondary from '../../components/ThemedCardSecondary';
import ThemedView from '../../components/ThemedView';






const bookings = () => {

const colorScheme = useColorScheme()
const theme = Colors[colorScheme] ?? Colors.light 
const [navBarSelection, setNavBarSelection] = useState('ongoing');
const [isStatusAwaitingAuth, setIsStatusAwaitingAuth] = useState(false);



function handleNavBarPress(selection) {
  setNavBarSelection(selection)
}

const UpcomingBooking = ({ item }) => {
  return (
    <ThemedCard style={{ borderRadius: 20, margin: 15, height: 425, backgroundColor: theme.cardColour, borderColor: '#bbbcc3', borderWidth: 1 }}>

      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start' }}>

        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Audi A3 Service </Text>
          <Text> Scheduled for June 25, 2024 at 10:00 AM </Text>
          <Text> At City Audi Dealership </Text>
        </View>

        <View style={{ flex: 0.475, alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          
          <ThemedCardSecondary style={{ width: '95%', height: '95%' }}></ThemedCardSecondary>

        </View>


      </View>

      <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center'}}>

       <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }}>
          <Text> 11/11/2025 </Text>
          <Text> 2:00 PM </Text>
          <Text> Oil Change and Inspection </Text>
        </View>

        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 40, marginLeft: 90 }}> £90 </Text>
        </View>

      </View>
      <UIDevider style={{ width: '130%' }} />

      <View style={{ flex: 0.22, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 12.5, width: '95%', justifyContent: 'space-between'}} >

          <TouchableOpacity style={styles.upcomingBookingsButton} onPress={() => router.push('/(dashboard)/bookings/bookingdetails')}> 
            <Text> Call </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.upcomingBookingsButton} onPress={() => router.push('/(dashboard)/bookings/bookingdetails')}> 
            <Text> Reschedule </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.upcomingBookingsButton, { borderColor: '#ff6b6b' }]} onPress={() => router.push('/(dashboard)/bookings/bookingdetails')}> 
            <Text style={{ color: '#991D1D' }}> Cancel </Text>
          </TouchableOpacity>

        </View>

        <View style={{ flex: 0.5, width: '95%', alignContent: 'center' , justifyContent: 'center'}} >
          <ThemedButton title="Show QR" style={{ width: '100%', height: '85%', marginTop: 25 }} onPress={() => router.push('/(dashboard)/bookings/bookingdetails')} />
        </View>

      </View> 

    </ThemedCard>
  )
}

const OngoingBookings = ({ item }) => {


  return (

    <View style={{ width: '100%', height: 800 }}>

      <ThemedView style={{ flex: 0.15, backgroundColor: theme.backgroundColor, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Elite Auto Services </Text>
            </View>

           <Text> Audi A3 - ABC123 </Text> 

      </ThemedView>

      <UIDevider style={{ width: '90%' }} />

      <ThemedView style={{ flex: 0.125, backgroundColor: theme.backgroundColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Progress  </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> 0/5 steps completed  </Text>
        </View>

      <View style={{ width: '95%', flex: 0.5, backgroundColor: '#BBBCC3', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 10, }}/>

      <Text style={{ marginLeft: 10, marginTop: 5 }}> Estimated Completion: 11/11/2025 </Text> 


      </ThemedView>


      {/* 0.65 FLEX IF AWAITING AUTHO, 0.39 FLEX IF NOT*/}

      <ThemedView style={{ flex: 0.39, backgroundColor: theme.backgroundColor }}> 
        
          <View style={{ width: '100%', height: '25%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
              <View style={{ width: '70%', height: '70%', borderColor: theme.borderColour, borderRadius: 10, borderWidth: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '25%', height: '25%', backgroundColor: theme.borderColour, borderRadius: 25 }}></View>
              </View>
            </View>            
            <View style={{ flex: 0.8, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: '#404255', fontSize: 15, fontWeight: 'black', marginTop: 15 }}>Check-In</Text>
              <Text style={{ color: '#515364', fontSize: 12 }}>Vehicle received and checked in</Text>
            </View>

          </View>

                    <View style={{ width: '100%', height: '25%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
              <View style={{ width: '70%', height: '70%', borderColor: theme.borderColour, borderRadius: 10, borderWidth: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '25%', height: '25%', backgroundColor: theme.borderColour, borderRadius: 25 }}></View>
              </View>
            </View>            
            <View style={{ flex: 0.8, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: '#404255', fontSize: 15, fontWeight: 'black', marginTop: 15 }}>Awaiting Authorization</Text>
              <Text style={{ color: '#515364', fontSize: 12 }}>Additional work needed - approval required</Text>
            </View>

          </View>
                    <View style={{ width: '100%', height: '25%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
              <View style={{ width: '70%', height: '70%', borderColor: theme.borderColour, borderRadius: 10, borderWidth: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '25%', height: '25%', backgroundColor: theme.borderColour, borderRadius: 25 }}></View>
              </View>
            </View>            
            <View style={{ flex: 0.8, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: '#404255', fontSize: 15, fontWeight: 'black', marginTop: 15 }}>Awaiting Parts</Text>
              <Text style={{ color: '#515364', fontSize: 12 }}>Parts are on their way</Text>
            </View>

          </View>
                    <View style={{ width: '100%', height: '25%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
              <View style={{ width: '70%', height: '70%', borderColor: theme.borderColour, borderRadius: 10, borderWidth: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '25%', height: '25%', backgroundColor: theme.borderColour, borderRadius: 25 }}></View>
              </View>
            </View>            
            <View style={{ flex: 0.8, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: '#404255', fontSize: 15, fontWeight: 'black', marginTop: 15 }}>Completed</Text>
              <Text style={{ color: '#515364', fontSize: 12 }}>Vehicle is now ready for pickup!</Text>
            </View>

          </View>



    
      </ThemedView> 

    <UIDevider style={{ width: '90%' }} />

      <ThemedView style={{ flex: 0.1, backgroundColor: 'blue' }} /> 
    </View>


)}

  return (
    <ScrollView style={{backgroundColor: theme.backgroundColour}} showsVerticalScrollIndicator={false}>

      <View style={styles.titleContainer}>

        <Text>Bookings</Text>
        <Text>Track and manage your appointments</Text>

      </View> 

      <View style={styles.navBarContainer}>

        <View style={styles.navBar}>

          <ThemedButton
            title="Upcoming"
            tab
            onPress={() => handleNavBarPress('upcoming')}
            selected={navBarSelection === 'upcoming'}
            style={styles.navBarButton}
            

          />

          <ThemedButton
            title="Ongoing"
            tab
            onPress={() => handleNavBarPress('ongoing')}
            selected={navBarSelection === 'ongoing'}
            style={styles.navBarButton}
          />

          <ThemedButton
            title="Past"
            tab
            onPress={() => handleNavBarPress('past')}
            selected={navBarSelection === 'past'}
            style={styles.navBarButton}
          />

        </View>
      </View>

      
      <View>
          {navBarSelection === 'upcoming' && (

            <UpcomingBooking/>

          )}
          {navBarSelection === 'ongoing' && (

            
            <OngoingBookings/>

          )}
          {navBarSelection === 'past' && (
            <ThemedCard style={{ padding: 20, borderRadius: 20, margin: 15, height: 40, backgroundColor: theme.cardColour }}>
          </ThemedCard>
        )}
      </View>


    </ScrollView>
  )
}

export default bookings

const styles = StyleSheet.create({

  titleContainer:
  {
    height: 60,
    justifyContent: 'start',
    alignItems: 'start',
    //backgroundColor: 'red',
    padding: 15,
  },
  navBarContainer:
  {
    alignItems: 'center',
    marginTop: 10,
    height: 70,
    //backgroundColor: 'blue',
    padding: 5,
  },
  navBar:{
    height: '82.5%',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e6e6e8',
    borderColor: '#bbbcc3',
    borderWidth: 1,
    borderRadius: 10,
  },

  navBarButton:
  {
    width: 110,
    height: 42.5,
    borderRadius: 10,
  },

  upcomingBookingsButton:
  {
    width: '30%', 
    height: '95%',
    borderColor: '#bbbcc3',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.75,
    borderRadius: 10,
  }

})