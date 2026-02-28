import { StyleSheet, Text, View, TouchableOpacity, TextInput, useColorScheme, Image  } from 'react-native'
import { router } from 'expo-router'
import React, { useState,  useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import ThemedView from '../../components/ThemedView.jsx'
import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard.jsx'
import ThemedCardSecondary from '../../components/ThemedCardSecondary.jsx'
import { Colors } from '../../constants/Colors'
import { dealershipService } from '../../services/dealershipService.js'
import MichromaReg from '../../components/MichromaReg.jsx';
import SatoshiReg from '../../components/SatoshiReg.jsx';
import SatoshiVar from '../../components/SatoshiVar.jsx';

const Map = () => {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light 

  const [searchText, setSearchText] = useState('');
  const [showInfo, setShowInfo] = useState(true);

  const topContainerFlex = showInfo ? 0.9 : 0.15;
  const topContainerButtonText = showInfo ? "Show Map" : "Show Info";

  const [dealerships, setDealerships] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  function toggleShowInfo() {
    setShowInfo(prev => !prev);
  }

  function loadDealerships() {
    dealershipService.getDealerships()
  }

let mapRef = null

useEffect(() => {
  const timer = setTimeout(() => {
    mapRef?.animateToRegion({
      latitude: 51.48991740404022,
      longitude: -0.5736802199852864,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }, 500);
  }, 500);

  return () => clearTimeout(timer);
}, []);


  const VehicleCard = ({ item, isSelected = true, onSelect, isChangeable = true }) => {
    
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
              Change
            </Text>
          </TouchableOpacity>)}
        </View>
      </View>
    </ThemedCardSecondary>
  );

};    

const mapStyle = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

  return (
    <View style={styles.Container}>
     
      <ThemedView style={{flex: topContainerFlex, width: '100%', backgroundColor: theme.backgroundColour}}>

        <View style={{alignItems: 'flex-start', justifyContent: 'center', height: 75, padding: 16}}>
          <MichromaReg style={{fontSize: 28, fontFamily:'Michroma-Regular'}}>Find Mechanics</MichromaReg>
          <SatoshiReg style={{fontSize: 16, fontFamily:'Satoshi-Regular', marginTop: 1, color:'#515364'}}>Find a garage near you </SatoshiReg>
        </View>

        {showInfo ? (

          <View style={{flex: 1}}>

            <VehicleCard/>               

                     
            <View style={{height: "30%", width: "100%", marginBottom: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: theme.backgroundColour}}>
              <View style={[styles.showMoreButton,{width: '77%', height: '80%', alignItems: 'flex-start', flexDirection:'column'}]}>

                <View style={{flex: 1, flexDirection: 'row'}}>

                  <View style={{marginLeft: 0, width: '15%', height: '100%', alignContent: 'center', justifyContent: 'center'}}>

                    <Image
                      source={require('../../assets/searchicon.png')}
                      style={{marginLeft: 2.5, width: '100%', height: '65%', resizeMode: 'contain'}}/>

                  </View>

                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search"
                    placeholderTextColor="#888"
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      fontSize: 16,
                      paddingVertical: 0, 
                    }}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

              </View>

              <View style={[styles.showMoreButton,{width: '12.5%', height: '80%', alignItems: 'center', flexDirection:'row', marginLeft: 5}]}>
                <Image source={require('../../assets/filter-icon.png')} style={{width: '60%', height: '60%', resizeMode: 'contain'}}/>
              </View>

            </View>
          </View>
        
        ) : null}
          
      </ThemedView>

    <ThemedView
      style={{
        flex: 0.2,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgroundColour,

      }}
    >
      {/* Left spacer */}
      <UIDevider style={{ width: '25%', marginRight: 15 }} />

      {/* Center touchable */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.showMoreButton,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '5'
          },
        ]}
        onPress={toggleShowInfo}
      >
        <View
          style={{
            width: '30%',
            height: "80%",
          }}
        >

        </View>
        <Text style={styles.searchText}>{topContainerButtonText}</Text>
      </TouchableOpacity>


      {/* Right spacer */}
      <UIDevider style={{ width: '25%', marginRight: 15 }} />
    </ThemedView>


      <ThemedView style={{flex: 1, width: '100%'}}>
        <MapView
          //onPress={(e) => console.log(e.nativeEvent.coordinate)}
        //onRegionChangeComplete={(region) => setRegion(region)}
        ref={(ref) => { mapRef = ref }}
        style={{ flex: 1 }}
        rotateEnabled={false}
        pitchEnabled={false}
        showsUserLocation
        showsPointsOfInterest={false} // iOS
        showsBuildings={false}       // iOS
        customMapStyle={mapStyle}    // Android
        initialRegion={{
          latitude: 51.48991740404022,
          longitude: -0.5736802199852864,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{ latitude: 51.48991740404022, longitude: -0.5736802199852864 }}
          title="Mechanic"
          onPress={() => router.push('/(book_appointment)/garageDetails')}>

            <Callout tooltip>
              <View style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5 }}>
                <Text>Mechanic</Text>
                <Text>Tap for details</Text>
              </View>
            </Callout>

        </Marker>
      </MapView>
      </ThemedView>

    </View>
  )
}

export default Map

const styles = StyleSheet.create({

  Container:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer:
  {
    height: 100,
    justifyContent: 'start',
    alignItems: 'start',
    //backgroundColor: 'red',
    padding: 15,
  },
  showMoreButton:
  {
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#a0a0aa',
    margin: 5,
  }

})