import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Dimensions, Image, ImageBackground, } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur';
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../constants/Colors'
import {devEnvConstants} from '../../constants/devEnvConstants'
//import { getBookingDetails } from "../../services/bookingServiceTemp";
//import Carousel from 'react-native-reanimated-carousel'


import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import ThemedCardSecondary from '../../components/ThemedCardSecondary';
import ThemedView from '../../components/ThemedView';
import ThemedButtonSecondary from '../../components/ThemedButtonSecondary';
import CheckIconCompleted from '../../assets/check-icon-bg.png';
import CheckIconPending from '../../assets/blank-icon-bg.png';
import CheckIconAlert from '../../assets/flag-icon-bg.png';
import MichromaReg from '../../components/MichromaReg';
import SatoshiVar from '../../components/SatoshiVar';





const bookings = () => {

const colorScheme = useColorScheme()
const theme = Colors[colorScheme] ?? Colors.light 
const [navBarSelection, setNavBarSelection] = useState('upcoming');
const [bookingStatus, setBookingStatus] = useState('')
const [isStatusAwaitingAuth, setIsStatusAwaitingAuth] = useState(false);


function handleNavBarPress(selection) {
  setNavBarSelection(selection)
}

async function getBookingDetails(bookingID) {
  
  const url = `https://api.simplydrive.app/Api/Bookings/BookingsByID?bookingID=${bookingID}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}

async function loadBookings() {
  try {
    const data = await getBookingDetails(6);
    console.log({data})
    setBookingStatus(data.status);
    console.log('setting bookingStatus to:', data.status);
    console.log(bookingStatus)
  } catch (err) {
    console.error(err);
  } 
}

useEffect(() => {
  loadBookings(); // initial load

  const interval = setInterval(() => {
    loadBookings();
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, []);

const UpcomingBooking = ({ item }) => {

  const [isShowingQR, setIsShowingQR] = useState(false);

  return (
    <ThemedCard style={{ borderRadius: 20, margin: 15, backgroundColor: theme.cardColour, borderColor: '#bbbcc3', borderWidth: 1 }}>

      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start' }}>

        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15, flexDirection: 'row', marginTop: 15}}>

          <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <View style={{ width: 50, height: 50, borderRadius: 15 }}>
              <Image
                source={require('../../assets/adaptive-icon.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          </View>

          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Your Garage</Text>
            <Text> 1234 Road Town,</Text>
            <Text> City Garage </Text>
          </View>


          <View style={{ flex: 0.335, justifyContent: 'flex-start', alignItems: 'center', marginLeft: 50, marginTop: 20 }}         >
            <View style={{ width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECFDF3', borderRadius: 10, marginRight: 10, borderColor: '#ABEFC6', borderWidth: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#067647' }}> Confirmed </Text>
            </View>

          </View>

        </View>

        <View style={{ flex: 0.475, alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          
          <ThemedCardSecondary style={{ width: '95%', height: '95%' }}></ThemedCardSecondary>

        </View>


      </View>

      <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

       <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10, marginVertical: 30 }}>
          <Text> 11/11/2025 </Text>

          <Text style={{marginVertical: 4 }}> 2:00 PM </Text>

          <Text> Oil Change </Text>
        </View>

        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 45, marginLeft: 60 }}> £99.99 </Text>
        </View>

      </View>
      <UIDevider style={{ width: '120%', marginTop: 10 }} />

      {isShowingQR && (
        <View style={{ marginTop: 30, alignItems: 'center' }}>

          <QRCode value="6@01DEMO@SZ2IIA$" size={200} />
          <UIDevider style={{ width: '120%', marginTop: 20 }} />
        </View>
        
      )}
      

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ height: 40, flexDirection: 'row', marginTop: 12.5, width: '95%', justifyContent: 'space-between'}} >

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
          <ThemedButton
          title={isShowingQR ? 'Hide QR' : 'Show QR'}
          style={{ width: '100%', height: '55%', marginTop: 20, marginBottom: 20 }}
          onPress={() => setIsShowingQR(prev => !prev)}
        />
        </View>

      </View>

    </ThemedCard>
  )
}

const OngoingBookingsProgressIcon = ({ title, description, completed }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const icon = completed ? CheckIconCompleted : CheckIconPending;

  return (

    <View style={{ width: '100%', height: '25%', alignSelf: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
        <Image
          source={icon}
          style={{ width: '70%', height: '70%', resizeMode: 'contain' }}
        />
      </View>

      <View style={{ flex: 0.8, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: theme.backgroundColor }}>
        <Text style={{ color: '#404255', fontSize: 15, fontWeight: 'black', marginTop: 15 }}>{title}</Text>
        <Text style={{ color: '#515364', fontSize: 12 }}>{description}</Text>
      </View>
      
    </View>
  );
};
const OngoingBookings = ({ item }) => {



let progress = 0;
let progressCount = 0;

if (bookingStatus === 'inworkshop') {
    progress = 0.25; // 25% progress
    progressCount = 1;
} else if (bookingStatus === 'awaitingAuthorization') {
    progress = 0.5; // 50% progress
    progressCount = 2;
} else if (bookingStatus === 'awaitingParts') {
    progress = 0.75; // 75% progress
    progressCount = 3;
} else if (bookingStatus === 'completed') {
    progress = 1; // 100% progress
    progressCount = 4;
}

  
  return (

    <View style={{ width: '100%', height: 800 }}>

      <ThemedView style={{ flex: 0.15, backgroundColor: theme.backgroundColor, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Your Garage </Text>
            </View>

           <Text> Audi A3 - ABC123 </Text> 

      </ThemedView>

      <UIDevider style={{ width: '90%' }} />

      <ThemedView style={{ flex: 0.125, backgroundColor: theme.backgroundColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Progress  </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {progressCount}/4 steps completed  </Text>
        </View>

      <View
        style={{
          width: '95%',
          height: 10, // fixed height
          backgroundColor: '#BBBCC3', // empty bar color
          borderRadius: 10,
          marginTop: 10,
          overflow: 'hidden', // ensures fill respects border radius
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            width: `${progress * 100}%`, // dynamically fill
            height: '100%',
            backgroundColor: '#FF6B35', // filled portion color
            borderRadius: 10,
          }}
        />
      </View>

      <Text style={{ marginLeft: 10, marginTop: 5 }}> Estimated Completion: 11/11/2025, 11:30AM </Text> 


      </ThemedView>


      {/* 0.65 FLEX IF AWAITING AUTHO, 0.39 FLEX IF NOT*/}

      <ThemedView style={{ flex: 0.40, backgroundColor: theme.backgroundColor, marginBottom: 40, marginTop: 45, 
        justifyContent: 'center', alignItems: 'center' }}> 
        
        <OngoingBookingsProgressIcon
          title="Check-In"
          description="Vehicle checked in and work is in progress"
          completed={progressCount >= 1}
        />

        <View style={{width: 2, height: 25, backgroundColor: '#079455', alignSelf:'flex-start', marginLeft: 36}}></View>

        <OngoingBookingsProgressIcon
          title="Awaiting Authorization"
          description="Approval request will be sent if additional work is required."
          completed={progressCount >= 2}
        />

        <View style={{width: 2, height: 25, backgroundColor: '#BBBCC3', alignSelf:'flex-start', marginLeft: 36}}></View>

        <OngoingBookingsProgressIcon
          title="Awaiting Parts"
          description="Parts are on their way"
          completed={progressCount >= 3}
        />

        <View style={{width: 2, height: 25, backgroundColor: '#BBBCC3', alignSelf:'flex-start', marginLeft: 36}}></View>

        <OngoingBookingsProgressIcon
          title="Completed"
          description="Vehicle is now ready for pickup!"
          completed={progressCount >= 4}
        />
    
      </ThemedView>   

    <UIDevider style={{ width: '90%' }} />

    <ThemedView
      style={{
        flex: 0.15,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
        gap: 10, 
      }}
    >
      <TouchableOpacity
        style={[styles.upcomingBookingsButton, { flex: 0.5, height: '40%', backgroundColor: theme.buttonSecondaryBackgroundColour }]}
        onPress={() => router.push('/(dashboard)/bookings/bookingdetails')}
      >
        <Text>Call Garage</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.upcomingBookingsButton, { flex: 0.5, height: '40%', backgroundColor: theme.buttonColourGradientA, borderWidth: 0 }]}
        onPress={() => router.push('/(dashboard)/bookings/bookingdetails')}
      >
        <Text style={{ color: 'white' }}>View Details</Text>
      </TouchableOpacity>

    </ThemedView>

    </View>


)}

const CompletedBooking = ({ item }) => {

  return (
    <ThemedCard style={{ borderRadius: 20, margin: 15, backgroundColor: theme.cardColour, borderColor: '#bbbcc3', borderWidth: 1 }}>

      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start' }}>

        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 15, flexDirection: 'row', marginTop: 15}}>

          <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <View style={{ width: 50, height: 50, borderRadius: 15 }}>
              <Image
                source={require('../../assets/adaptive-icon.png')}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          </View>

          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Your Garage</Text>
            <Text> 1234 Road Town,</Text>
            <Text> City Garage </Text>
          </View>


          <View style={{ flex: 0.335, justifyContent: 'flex-start', alignItems: 'center', marginLeft: 50, marginTop: 20 }}         >
            <View style={{ width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECFDF3', borderRadius: 10, marginRight: 10, borderColor: '#ABEFC6', borderWidth: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#067647' }}> Confirmed </Text>
            </View>

          </View>

        </View>

        <View style={{ flex: 0.475, alignContent: 'center', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          
          <ThemedCardSecondary style={{ width: '95%', height: '95%' }}></ThemedCardSecondary>

        </View>


      </View>

      <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

       <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10, marginVertical: 30 }}>
          <Text> 11/11/2025 </Text>

          <Text style={{marginVertical: 4 }}> 2:00 PM </Text>

          <Text> Oil Change </Text>
        </View>

        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 45, marginLeft: 60 }}> £99.99 </Text>
        </View>

      </View>
      <UIDevider style={{ width: '120%', marginTop: 10 }} />
     

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ flex: 0.5, width: '95%', alignContent: 'center' , justifyContent: 'center'}} >
          <ThemedButton
          title={'Leave a Review'}
          style={{ width: '100%', height: '55%', marginTop: 20, marginBottom: 20 }}
        />
        </View>

      </View>

    </ThemedCard>
  )
}

  return (
    <ScrollView style={{backgroundColor: theme.backgroundColour}} showsVerticalScrollIndicator={false}>

      <View style={styles.titleContainer}>

        <MichromaReg>Bookings</MichromaReg>
        <SatoshiVar style={{fontSize:18}}>Track and manage your appointments</SatoshiVar>

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
        
          {navBarSelection === 'upcoming' && bookingStatus === 'upcoming' &&(

            <UpcomingBooking/>

          )}
          {navBarSelection === 'upcoming' && bookingStatus != 'upcoming' &&(
            <View style={{flex:1 , alignItems: 'center', justifyContent:'center'}}>
              <Text style={{textAlignVertical:'center', marginTop: 120, fontSize: 16}}> Currently no upcoming bookings </Text>
            </View>

          )}


          {navBarSelection === 'ongoing' && bookingStatus === 'inworkshop' &&(
            <OngoingBookings/>
          )}

          {navBarSelection === 'ongoing' && bookingStatus != 'inworkshop' &&(
            <View style={{flex:1 , alignItems: 'center', justifyContent:'center'}}>
              <Text style={{textAlignVertical:'center', textAlign:'center',  marginTop: 120, fontSize: 16}}> Once you check in, recieve live updates on your vehicle here </Text>
            </View>
          )}


          {navBarSelection === 'past' && bookingStatus === 'completed' &&(
            
            <CompletedBooking />

        )}
      </View>


    </ScrollView>
  )
}

export default bookings

const styles = StyleSheet.create({

  titleContainer:
  {
    height: 100,
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