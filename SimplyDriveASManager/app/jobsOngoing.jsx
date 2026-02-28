import { StyleSheet, Text, View , useColorScheme, TouchableOpacity, ImageBackground, Image, ScrollView  } from 'react-native'
import { router } from 'expo-router'

import UIDevider from '../components/UIDevider'
import ThemedView from '../components/ThemedView'
import ThemedCardSecondary from '../components/ThemedCardSecondary'

import { Colors } from '../constants/Colors'
import React, { useState, useEffect } from 'react'



const jobsOngoing = () => {

const colorScheme = useColorScheme() ?? 'light'
const theme = Colors[colorScheme]

const [selectedVehicleId, setSelectedVehicleId] = useState(null);
const [selectedServiceID, setSelectedServiceID] = useState([])
const [selectedTimeslot, setSelectedTimeslot] = useState(null);
const [selectedDate, setSelectedDate] = useState(null);
const [bookingStatus, setBookingStatus] = useState('')

const vehicles = [

  { id: 1, name: 'Audi A3 - ABC123' },

];

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

async function updateBookingStatus(bookingID, bookingSatus)
{

  console.log(`Sending ${bookingID}`) 
  const numericBookingID = Number(bookingID);
  const url = `https://api.simplydrive.app/Api/Bookings/UpdateStatus?bookingID=${numericBookingID}&newStatus=${bookingSatus}`;


  fetch(url, { method: "PUT" })
      .then(res => res.json())
      .then(data => console.log("Response:", data))
      .catch(err => console.error("Error:", err));  

  
}
useEffect(() => {
  loadBookings(); // initial load

  const interval = setInterval(() => {
    loadBookings();
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, []);


const VehicleCard = ({ item, isSelected, onSelect, isChangeable = true }) => {
    
  //const [isSelected, setIsSelected] = useState(false);

  // Conditional styles
  const cardBackground = isSelected ? ['#FF6B35', '#D62828'] : ['#222435', '#515364'];
  const buttonBackground = isSelected ? '#ffffff' : '#FF6B35';
  const isSelectedText = isSelected ? 'Selected' : 'Select';
  const buttonBorderColor = isSelected ? '#404255' : '#FF6B35';
  

  return (

    <ThemedCardSecondary
      style={{
        flex:1,
        padding: 10,
        borderRadius: 20,
        gradientColors: [cardBackground, cardBackground],
        flexDirection: 'row',
      }}

      gradientColors={cardBackground}>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.6 }}>
          <Image
            source={require('../assets/card-car-stock.png')}
            style={{ width: '80%', height: '100%', resizeMode: 'fill' }}
          />
        </View>

        <View style={{ flex: 0.4, padding: 10, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, color: '#E6E6E8'}}>
            Booking for:
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold',  marginBottom: 10, color: '#E6E6E8'}}>
            Audi A3 - ABC123
          </Text>

          {isChangeable &&(

          <TouchableOpacity
            onPress={onSelect}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#A0A0AA',
              borderWidth: 1,
              width: '85%',
              height: '40%',
            }}
          >
            <Text style={{ color: '#E6E6E8 ', fontWeight: 'bold' }}>
              { isSelectedText }
            </Text>
          </TouchableOpacity>)}
        </View>
      </View>
    </ThemedCardSecondary>
  );

};

const SelectedOngoingBooking = ({ selectedVehicle }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#EEEEF0',
        borderColor: '#BBBCC3',
        borderRadius: 25,
        borderWidth: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!selectedVehicle ? (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#515364',
          }}
        >
          Select one of the currently ongoing bookings from the menu on the left
        </Text>
      ) : (
        <View style={{ width: '100%', height:'100%', justifyContent:'center', alignContent:'center' }}>

          <View style={{height:'100%', width:400, backgroundColor:'#ffffff', borderRadius:25, padding: 15, elevation: 15, marginLeft:10}}>

            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf:'center' }}>
              Booking Details
            </Text>

            <UIDevider style={{marginTop: 15, marginBottom: 15}}/>
            
              <Text style={{ fontSize: 18, alignSelf:'center' }}>Vehicle</Text>
              <Text style={{ fontSize: 18, alignSelf:'center'  }}>{selectedVehicle.name}</Text>

            <UIDevider style={{marginTop: 15, marginBottom: 15}}/>
            

            <Text style={{ fontSize: 18, marginTop: 5, alignSelf:'center' }}>
              Estimated Completion
            </Text>

            <Text style={{ fontSize: 18, marginTop: 5, alignSelf:'center' }}>
              Date: 11/11/2025
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5, alignSelf:'center' }}>
              Time: 11:30
            </Text>

            <UIDevider style={{marginTop: 15, marginBottom: 15}}/>

              <View style={{height:125}}>
                <TouchableOpacity style={[styles.button, {height: "30%", width:'100%'}]} onPress={() => router.replace('/')}>
                  <Text style={[styles.buttonText, {fontSize:18}]}>Update ETA</Text>
                </TouchableOpacity>            
                <TouchableOpacity style={[styles.button, {height: "30%", width:'100%'}]} onPress={() => console.log('Button Pressed')}>
                  <Text style={[styles.buttonText, {fontSize:18}]}>Request Authorisation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {height: "30%", width:'100%'}]}   onPress={() => {updateBookingStatus(6, 'completed'); router.replace('/');}}>
                  <Text style={[styles.buttonText, {fontSize:18}]}>Mark as Complete</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
      )}
    </View>
  );
};

const ScrollMenuBooking = ({ item }) => {
  return (
    <View style={{ width: '100%', height: 130, marginVertical: 5, alignSelf: 'center'}}>
        <VehicleCard
            item={item}
            isSelected={selectedVehicleId === item.id}
            onSelect={() => setSelectedVehicleId(item.id)}
        />
    </View>
  )
}

  return (


    <View style={{flex:1}}>
        <ImageBackground source={require('../assets/lightmodebg.jpg')} style={{height:'100%', width:'100%', opacity:1}}>
        <View style={styles.bgOverlay} />

        <View style={{height:'80%', width:'100%', padding:5}}>

            <Text style={{fontSize:32, marginTop:45,  marginLeft: 15}}> Jobs Ongoing </Text>

            <UIDevider style={{ marginTop: 35,marginBottom: 5, width:'80%'}}/>

                {bookingStatus === 'inworkshop' &&(
                <View style={{height:'80%', width:'100%', backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'center', alignContent:'center' }}>    


                    <View style={{width:'25%', height:'100%', justifyContent:'center', alignContent:'center'}}>

                        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                            {vehicles.map((v) => (
                                <ScrollMenuBooking key={v.id} item={v} />
                            ))}
                        </ScrollView>
                        
                    </View>

                    <View style={{width:'75%', height:'100%'}}>

                        <SelectedOngoingBooking
                        selectedVehicle={vehicles.find((v) => v.id === selectedVehicleId)}/>

                    </View>

                </View>
                )}

                {(bookingStatus === "upcoming" || bookingStatus === "" || bookingStatus === "completed") &&(
                    <View style={{height:'80%', width:'100%', justifyContent:'center'}}>
                        <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 20,
                            color: '#515364',
                        }}
                        >
                        Currently no bookings are checked-in
                        </Text>
                    </View>
                )}

            <UIDevider style={{ marginTop:5, width:'80%'}}/>

        </View>


          <TouchableOpacity style={[styles.button, {marginTop: 50, marginLeft: 500}]} onPress={() => router.replace('/')}>
            <Text style={styles.buttonText}>Return</Text>
          </TouchableOpacity>

    </ImageBackground>

    </View>



    
  )
}

export default jobsOngoing

const styles = StyleSheet.create({


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
  },
bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },
    button: {
    margin: 5,
    height: 70,
    width: 250,
    backgroundColor: '#fffff',
    borderColor:'#FF7C7C',
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#FF7C7C',
    fontSize: 30,
    fontWeight: 'bold',
  },


})