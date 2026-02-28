import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router } from 'expo-router'
import UIDevider from '../components/UIDevider';
import ThemedCardSecondary from '../components/ThemedCardSecondary';
import ThemedView from '../components/ThemedView';

export default function CalendarPage() {

  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

const bookingListArty = {
  '2026-02-20': ['08:00', '09:00', '10:00', '11:00'],
  '2026-02-21': ['13:00'],
};


const timeSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
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
    // If backend returns single booking, wrap it:
    console.log('Fetched booking data:', data);
    setBookings([data]);

    // If backend already returns array:
    // setBookings(data);

  } catch (err) {
    console.error(err);
  }
}


useEffect(() => {
  loadBookings();
}, []);

const TimeBlock = ({ start, end, selectedDate, bookings = []}) => {
 console.log('TimeBlock rendered', start, end, selectedDate, bookings.length);
  const slotBookings = bookings.filter(b => {
    const bookingDate = b.date?.split('T')[0];
    const bookingTime = b.time?.slice(0,5);
    console.log('Booking Date:', bookingDate, 'Booking Time:', bookingTime, 'Selected Date:', selectedDate, 'Slot Start:', start);
    return bookingDate === selectedDate && bookingTime === start;

  });

  
  return (

    <View style={{ height: '100%', width: '12.4%' }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginTop: 5,
        }}
      >
        {start} - {end}
      </Text>

      <UIDevider style={{ width: '90%' }} />

      {/* Scrollable area for multiple bookings */}
      <View style={{ flex: 1 }}>
        <ScrollView>
          {slotBookings.map((booking) => (
            <VehicleCard
              key={booking.bookingid}
              item={booking}
              isSelected={false}
              onSelect={() => {}}
              isChangeable={true}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};


const VehicleCard = ({ item, isSelected, onSelect, isChangeable = false }) => {
    
  //const [isSelected, setIsSelected] = useState(false);

  // Conditional styles
  const cardBackground = isSelected ? ['#FF6B35', '#D62828'] : ['#222435', '#515364'];
  const buttonBackground = isSelected ? '#ffffff' : '#FF6B35';
  const isSelectedText = isSelected ? 'Selected' : 'Select';
  const buttonBorderColor = isSelected ? '#404255' : '#FF6B35';
  

  return (
    <TouchableOpacity style={{ height: 75, width: '100%' }} onPress={onSelect}>
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
                style={{ width: '80%', height: '100%', resizeMode: 'contain' }}
            />
            </View>

            <View style={{ flex: 0.6, padding: 10, alignItems: 'flex-end' }}>

                <Text style={{ fontSize: 12, fontWeight: 'bold',  marginBottom: 0, color: '#E6E6E8'}}>
                    Audi A3 - ABC123
                </Text>

            </View>
        </View>
        </ThemedCardSecondary>
    </TouchableOpacity>
  );

};

  return (


    <View style={styles.container}>

    <View style={{width: '100%', height: '10%'}}>
        <TouchableOpacity onPress={() => router.push('/')} style={{ width: '10%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:7.5}}>
            <Image source={require('../assets/back-icon.png')} style={{width: '15%', height: '40%', resizeMode: 'contain', marginRight: 5,}}/>
            <Text style={{fontSize:18}}> Back </Text>
        </TouchableOpacity>
    </View>

    <UIDevider style={{width: '90%'}}/>

      <Calendar
        style={{}}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#E85D2F',
          },
        }}
        theme={{
          todayTextColor: '#E85D2F',
          arrowColor: '#E85D2F',
          selectedDayBackgroundColor: '#E85D2F',
        }}
      />
      <UIDevider style={{width: '90%', marginTop: 20}}/>
      {selectedDate && (

        <View style={styles.infoBox}>

          <Text style={styles.dateText}>
            Selected: {selectedDate}
          </Text>

          <View style={{height:'80%', width: '100%', flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop: 20}}>

{timeSlots.map((time, index) => (
  <React.Fragment key={time}>
    <UIDevider style={{ height: '95%', width: 1.5 }} />
    <TimeBlock
      start={time}
      end={`${String(parseInt(time.split(':')[0]) + 1).padStart(2,'0')}:00`}
      selectedDate={selectedDate}
      bookings={bookings} // <-- PASS BOOKINGS
      index={index}       // optional if you want to use timeslot
    />
  </React.Fragment>
))}
<UIDevider style={{ height: '95%', width: 1.5 }} />

       

          </View>
        

        </View>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  infoBox: {
    marginTop: 20,
    alignItems: 'center',
    elevation: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    height: '41%'
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },    

  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },
  

});
