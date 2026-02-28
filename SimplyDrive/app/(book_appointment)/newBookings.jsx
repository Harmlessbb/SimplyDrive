
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, useColorScheme, ImageBackground } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import UIDevider from '../../components/UIDevider'
import ThemedCard from '../../components/ThemedCard'
import { VehicleContext } from '../../context/VehicleContext'
import { Colors } from '../../constants/Colors'
import ThemedButton from '../../components/ThemedButton.jsx'
import ThemedCardSecondary from '../../components/ThemedCardSecondary.jsx'


const NewBookings = () => {

 const [navBarSelection, setNavBarSelection] = useState('Service');

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light 

  const [stepCounter, setStepCounter] = useState(1)
  const totalSteps = 4
  const progressPercent = (stepCounter / totalSteps) * 100

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedServiceID, setSelectedServiceID] = useState([])
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

const timeslots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
];

const services = [
  { id: 1, name: 'Oil Change', description: 'Basic Oil and Oil Filter Change', price: 99.99 },
  { id: 2, name: 'Full Service', description: 'Complete service including oil change, filters, inspection', price: 179.99 },
  { id: 3, name: 'MOT', description: 'Standard MOT Test', price: 75 },
  { id: 4, name: 'Diagnostic', description: 'Vehicle diagnostic and repair', price: 49.99 },
]

const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);
// const totalCost = selectedServiceID.reduce((sum, id) => {
//   const service = services.find(s => s.id === id)
//   return service ? sum + service.price : sum
// }, 0)

const selectedServices = services.filter(service =>
  selectedServiceID.includes(service.id)
);

const totalCost = selectedServices.reduce((sum, service) => sum + service.price, 0);


const toggleService = (id) => {
  setSelectedServiceID(prev =>
    prev.includes(id)
      ? prev.filter(serviceId => serviceId !== id) // remove
      : [...prev, id] // add
  )
}

const renderServices = () => {
  
  switch (navBarSelection) {
    case 'Service':
      return (
        <>
          <ServiceCard serviceName='Oil Change' serviceDescription='Basic Oil and Oil Filter Change' servicePrice='£99.99' id={1} isSelected={selectedServiceID.includes(1)} onSelect={() => toggleService(1)}/>
          <ServiceCard serviceName='Full Service' serviceDescription='Complete service including all filter changes, fuel filter or spark plugs and inspection of all vehicle systems.' servicePrice='£179.99'  id={2} isSelected={selectedServiceID.includes(2)} onSelect={() => toggleService(2)} />
        </>
      )
    case 'MOT':
      return <ServiceCard serviceName='MOT' serviceDescription='Standard MOT Test' servicePrice='£74.99' id={3} isSelected={selectedServiceID.includes(3)} onSelect={() => toggleService(3)} />
    case 'Repairs':
      return <ServiceCard serviceName='Diagnostic' serviceDescription='Having an unexpected issue with your vehicle? Our trained technicians will diagnose and fix  the problem.' servicePrice='£49.99' id={4} isSelected={selectedServiceID.includes(4)} onSelect={() => toggleService(4)} />
    default:
      return null
  }
}


  function handleBackPress() 
  {
    if (stepCounter > 1) {
        setStepCounter(stepCounter - 1)
        return
    }
    else if (stepCounter === 1)
    {
        router.push('/(dashboard)/map')
    }

 }

  function handleNavBarPress(selection) {
  setNavBarSelection(selection)
}

async function setBookingStatusToUpcoming(bookingID)
  {

   console.log(`Sending ${bookingID}`) 
    const numericBookingID = Number(bookingID);
    const url = `https://api.simplydrive.app/Api/Bookings/UpdateStatus?bookingID=${numericBookingID}&newStatus=upcoming`;


    fetch(url, { method: "PUT" })
        .then(res => res.json())
        .then(data => console.log("Response:", data))
        .catch(err => console.error("Error:", err));  

  }

  const ProgressDisplay = ({ stepCounter }) => {
    return (

            <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', backgroundColor: 'white',}}>

                <View style={{width: '100%', height: '25%'}}>
                    <TouchableOpacity onPress={handleBackPress} style={{ width: '25%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:7.5}}>
                        <Image source={require('../../assets/back-icon.png')} style={{width: '15%', height: '40%', resizeMode: 'contain', marginRight: 5,}}/>
                        <Text> Back </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '95%', height: '40%',  alignContent: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#222435'}}> Book Appointment </Text>
                </View>

                <View style={{width: '95%', height: '40%',  alighnContent: 'flex-start', justifyContent: 'flex-start'}}>

                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#222435', height: 30, textAlign: 'start'}}> Step {stepCounter} of 4 </Text>
                    
                    <View
                    style={{
                        width: '95%',
                        height: 10,
                        backgroundColor: '#BBBCC3',
                        alignSelf: 'center',
                        borderRadius: 10,
                        overflow: 'hidden', // IMPORTANT
                    }}
                    >
                    <View
                        style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        backgroundColor: '#FF6B35', // your brand color
                        borderRadius: 10,
                        }}
                    />
                    </View>


                </View>


            </View>        
  )}

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
        width: '100%',
        height: 140,
        padding: 10,
        borderRadius: 20,
        gradientColors: [cardBackground, cardBackground],
        flexDirection: 'row',
      }}

      gradientColors={cardBackground}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.6 }}>
          <Image
            source={require('../../assets/card-car-stock.png')}
            style={{ width: '80%', height: '100%', resizeMode: 'fill' }}
          />
        </View>

        <View style={{ flex: 0.4, padding: 10, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#E6E6E8'}}>
            Booking for:
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 10, color: '#E6E6E8'}}>
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

  const ServiceCard = ({ item, isSelected, onSelect, serviceName, serviceDescription, servicePrice   }) => {        

  //const [isSelected, setIsSelected] = useState(false);
  //Conditional styles

  const cardBorderColour = isSelected ? '#E85D2F' : '#BBBCC3';

  const checkedBox = require('../../assets/box-ticked.png');
  const uncheckedBox = require('../../assets/box-unticked.png');

  const checkBox = isSelected ? checkedBox : uncheckedBox;

  return (  

  <TouchableOpacity activeOpacity={0.8} onPress={() => onSelect(item)}>
    <View
      style={{
        height: 110,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: cardBorderColour,
        marginVertical: 10,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 0.15, justifyContent: 'flex-start', alignItems: 'center', }}>
      <Image
        source={checkBox}
        style={{ width: 32.5, height: 32.5, marginTop:35, marginLeft: 5,  }}
        resizeMode="contain"

      />
      </View>

      <View style={{ flex: 0.95, justifyContent: 'center', alignItems:'flex-start' }}>
        <View style={{ height: '30%', width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-even' }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 10,
            }}>
            {serviceName}
          </Text>

          <Text style={{

              fontSize: 24,
              fontWeight: 'bold',
              marginLeft: 100,
              alignSelf:'flex-start'

            }}
          >
            {servicePrice}
          </Text>

        </View>


        <Text
          style={{
            fontSize: 14,
            marginTop: 6,
            marginLeft: 10,
            color: '#666',
          }}
        >
          {serviceDescription}
        </Text>
      </View>

 
    </View>
  </TouchableOpacity>


)};



  return (

    <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
      {stepCounter === 1 && (
        <View style={{flex: 1,}}>

            <ProgressDisplay
            stepCounter={stepCounter}
            onBack={handleBackPress}
            />
          <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '95%'}}/>
            <View style={{flex: 0.3, justifyContent: 'flex-start', alignItems: 'center',  width: '100%'}}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222435', marginBottom: 10}}> Booking for your vehicle </Text>
                    <Text> Confirm vehicle details before continuing </Text>

                </View>
            </View>

            <ScrollView style={{flex: 0.5, width: '100%',}}>
              <VehicleCard
                id={1}
                isSelected={selectedVehicleId === 1}
                onSelect={() => setSelectedVehicleId(1)}
              />
              <VehicleCard
                id={2}
                isSelected={selectedVehicleId === 2}
                onSelect={() => setSelectedVehicleId(2)}
              />
            </ScrollView>

            <TouchableOpacity disabled={!selectedVehicleId} onPress={() => setStepCounter(stepCounter + 1)} style={{height: 50, width: '90%', backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginBottom: 60, }}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}> Continue to service selection </Text>
            </TouchableOpacity>

        </View>
      )}

      {stepCounter === 2 && (
        <View
          style={{
            flex: 1,
          }}>


            <ProgressDisplay
            stepCounter={stepCounter}
            onBack={handleBackPress}
            />
      <ScrollView style={{flex: 0.5, width: '100%',}}>
      <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '95%'}}/>
            <View style={{height: 15, marginTop: 10}}/>
              <VehicleCard
                id={selectedVehicleId}
                isSelected={selectedVehicleId === selectedVehicleId}
              />
            <UIDevider style={{justifyContent: 'center', marginTop: 10, marginBottom: 10, width: '95%'}}/>

            <View style={{flex: 0.4, justifyContent: 'flex-start', alignItems: 'center',  width: '100%'}}>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 15}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222435', marginBottom: 10}}> Select Services </Text>
                    <Text> Choose one or multiple services for your vehicle </Text>

                </View>
            </View>

      <View style={styles.navBarContainer}>
        

        <View style={styles.navBar}>

          <ThemedButton
            title="Service"
            tab
            onPress={() => handleNavBarPress('Service')}
            selected={navBarSelection === 'Service'}
            style={styles.navBarButton}
            

          />

          <ThemedButton
            title="MOT"
            tab
            onPress={() => handleNavBarPress('MOT')}
            selected={navBarSelection === 'MOT'}
            style={styles.navBarButton}
          />

          <ThemedButton
            title="Repairs"
            tab
            onPress={() => handleNavBarPress('Repairs')}
            selected={navBarSelection === 'Repairs'}
            style={styles.navBarButton}
          />
          <ThemedButton
            title="Other"
            tab
            onPress={() => handleNavBarPress('Other')}
            selected={navBarSelection === 'Other'}
            style={styles.navBarButton}
          />          

        </View>
      </View>   

      {renderServices()}

        <View style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          borderColor: '#BBBCC3',
          backgroundColor: '#EEEEF0'
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Selected Services:</Text>
          {selectedServices.map(service => (
            <Text key={service.id} style={{ fontSize: 14, marginTop: 15 }}>
              {service.name} - £{service.price}
            </Text>
          ))}
          <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '100%'}}/>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 25 }}>
            Total: £{totalCost}
          </Text>
        </View>    

      <TouchableOpacity disabled={selectedServiceID.length === 0} onPress={() => setStepCounter(stepCounter + 1)} style={{height: 50, width: '90%', backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginBottom: 60 ,marginTop: 20,}}>
              <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}> Select Date & Time </Text>
      </TouchableOpacity>

      </ScrollView>         


        </View>
      )}      
      {stepCounter === 3 && (
        <View
          style={{
            flex: 1,
          }}>

        <ProgressDisplay
            stepCounter={stepCounter}
            onBack={handleBackPress}
        />
      <ScrollView style={{flex: 0.5, width: '100%',}}>
      <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '95%'}}/>
            <View style={{height: 15, marginTop: 5}}/>
              <VehicleCard
                id={selectedVehicleId}
                isSelected={selectedVehicleId === selectedVehicleId}
              />
            <UIDevider style={{justifyContent: 'center', marginTop: 10, marginBottom: 10, width: '95%'}}/>

            <View style={{flex: 0.4, justifyContent: 'flex-start', alignItems: 'center',  width: '100%'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 15}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#222435', marginBottom: 10}}> Select Date & Time </Text>
                    <Text> Choose your preferred appointment slot </Text>
                </View>
            </View>

            <View style={{ marginTop: 10, marginBottom: 50}}>

              <View style={{ height: 90, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', marginBottom: 10, flex: 0.4 }}>
                  <TouchableOpacity onPress={() => { /* Handle previous month */ }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{'<'}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Feburary 2026 </Text>
                  <TouchableOpacity onPress={() => { /* Handle next month */ }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{'>'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '90%', flex: 0.6 }}>

                </View>

              </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: '80%', height: 30, marginBottom: 2, marginLeft: 20 }}>
                  {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <Text key={index} style={{ fontSize: 12, fontWeight: 'bold', width: '14.28%', textAlign: 'center', marginHorizontal: 3 }}> {day} </Text>
                  ))}
                </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center' }}>
                
                {daysInMonth.map(day => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => setSelectedDate(day)}
                    style={{
                      width: '10%', // 7 columns for week
                      padding: 10,
                      margin: 6,
                      backgroundColor: selectedDate === day ? '#FF6B35' : 'transparent',
                      alignItems: 'center',
                      borderRadius: 30
                    }}
                  >
                    <Text style={{ color: selectedDate === day ? '#fff' : '#222435' }}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </View>             
            </View>

            <View style={{ marginTop: 5, marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginLeft: 10 }}>Select Time </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center' }}>
                {timeslots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedTimeslot(slot)}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      margin: 5,
                      backgroundColor: selectedTimeslot === slot ? '#FF6B35' : '#E6E6E8',
                      minWidth: 80,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: selectedTimeslot === slot ? '#fff' : '#222435', fontWeight: 'bold' }}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

        <TouchableOpacity disabled={!selectedTimeslot} onPress={() => {setStepCounter(stepCounter + 1); setBookingStatusToUpcoming(6);}} style={{height: 50, width: '90%', backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginBottom: 60, }}>
          <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}> Confirm Details </Text>
        </TouchableOpacity>

      </ScrollView>          

    </View>
      )}      

      {stepCounter === 4 && (
        <View
          style={{
            flex: 1,
          }}>

          <ProgressDisplay
          stepCounter={stepCounter}
          onBack={handleBackPress}
          />        
          <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '95%'}}/>
          <ScrollView style={{flex: 0.5, width: '100%',}}>

            <ImageBackground style={{width: '100%', height: 275, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center',}} source={require('../../assets/background-booking-confirmed.png')}> 
              <View style={{width: 100, height: 100, backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center', borderRadius: 25}}>
                  <Image
                      source={require('../../assets/box-ticked.png')}
                      style={{width: '60%', height: '60%', resizeMode: 'contain'}}
                  ></Image>

              </View>
              
              <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, width: '100%', textAlign: 'center'}}> Booking Confirmed! </Text>
              <Text style={{fontSize: 18, width: '100%', textAlign: 'center', marginBottom: 80}}> Your appointment has been scheduled </Text>
            </ImageBackground> 

        <View style={{
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
          borderColor: '#BBBCC3',
          backgroundColor: '#EEEEF0'
        }}>

          <View style={{height: 75, padding: 15}}>
            <Text style={{fontSize: 22, fontWeight:'bold'}}>Booking Summery</Text>

          </View>
            <UIDevider/>

          <VehicleCard
            id={selectedVehicleId}
            isChangeable={false}
          />
          
          <View style={{height: 75, flexDirection: 'row'}}>
              <View style={{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <View style={{width: 40, height: 40, backgroundColor: '#FFFFFF', borderColor:'#BBBCC3', borderRadius:10, borderWidth: 1, alignItems: 'center', justifyContent:'center'}}>
                  <Image
                      source={require('../../assets/location-icon.png')}
                      style={{width: '60%', height: '60%', resizeMode:'contain'}}
                  ></Image>
                </View>
              </View>
              
              <View style={{flex: 0.75, alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:14, fontWeight:'bold',}}> Address </Text>
                <Text style={{fontSize:16,}}> 1234 Road Town, City Garage </Text>
              </View>
          </View>

          <View style={{height: 75, flexDirection: 'row'}}>
              <View style={{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <View style={{width: 40, height: 40, backgroundColor: '#FFFFFF', borderColor:'#BBBCC3', borderRadius:10, borderWidth: 1, alignItems: 'center', justifyContent:'center'}}>
                  <Image
                      source={require('../../assets/calendar-icon.png')}
                      style={{width: '60%', height: '60%', resizeMode:'contain'}}
                  ></Image>
                </View>
              </View>
              
              <View style={{flex: 0.75, alignContent: 'center', justifyContent: 'center'}}>
                
                <Text style={{fontSize:14, fontWeight:'bold',}}> Date & Time </Text>
                  {selectedDate  && (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignContent: 'center'
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        Feburary {selectedDate} 2026
                      </Text>

                      <Text style={{ fontSize: 16 }}>
                        {selectedTimeslot}
                      </Text>
                    </View>
                  )}
              </View>
          </View>

          <View style={{padding: 15}}>

            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Selected Services:</Text>
            {selectedServices.map(service => (
              <View key={service.id} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                <Text style={{ fontSize: 16, marginTop: 15 }}>
                  {service.name} 
                </Text>
                <Text  style={{ fontSize: 16, marginTop: 15 }}>
                  £{service.price}
                </Text>       
              </View>       
            ))}
            <UIDevider style={{justifyContent: 'center', marginTop: 10, width: '100%'}}/>

            <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 25 }}>
              Total: £{totalCost}
            </Text>

          </View>

        </View> 

          <TouchableOpacity onPress={() => router.push('/(dashboard)/bookings')} style={{height: 50, width: '95%', backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 10, marginBottom: 20, marginTop: 50 }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}> View my bookings </Text>
          </TouchableOpacity>

        </ScrollView>


          <View style={{height: 50}}/>
        </View>


      )}               
    </View> //END OF VIEW
  )
}

export default NewBookings


const styles = StyleSheet.create({

   navBarButton:
  {
    width: 90,
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:0,
    paddingHorizontal: 0, 
  },
  navBar:{
    height: '50',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e8',
    borderColor: '#bbbcc3',
    borderWidth: 1,
    borderRadius: 10,
  },  
  navBarContainer:
  {
    alignItems: 'center',
    marginTop: 0,
    height: 65,
    //backgroundColor: 'blue',
    padding: 0,
  },  

})