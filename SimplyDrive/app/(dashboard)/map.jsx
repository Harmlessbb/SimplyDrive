import { StyleSheet, Text, View, TouchableOpacity, TextInput, useColorScheme,   } from 'react-native'
import { router } from 'expo-router'
import React, { useState,  useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import ThemedView from '../../components/ThemedView.jsx'
import UIDevider from '../../components/UIDevider'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard.jsx'
import ThemedCardSecondary from '../../components/ThemedCardSecondary.jsx'
import { Colors } from '../../constants/Colors'
import { dealershipService } from '../../services/dealershipService.js'

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

    // useEffect(() => {
    //   async function loadDealerships() {
    //     try {
    //       const data = await loadDealerships();
    //       console.log(data);
    //       setDealerships(data);
    //     } catch (err) {
    //       console.error(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }

    //   loadDealerships();
    // }, []);

  return (
    <View style={styles.Container}>
     
      <ThemedView style={{flex: topContainerFlex, width: '100%', backgroundColor: theme.backgroundColour}}>

        <View style={{alignItems: 'flex-start', justifyContent: 'center', height: 75, padding: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Find Mechanics</Text>
          <Text>Find mechanics near you</Text>
        </View>

        {showInfo ? (

          <View style={{flex: 1}}>

            <ThemedCardSecondary style={{width: '100%', flex: 1, padding: 10, borderRadius: 20, backgroundColor: theme.backgroundColour, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 0.6}}>

                  </View>

                  <View style={{flex: 0.4, padding: 10, alignItems: 'flex-end'}}>

                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Booking for:</Text>
                    <Text style={{fontSize: 14, marginBottom: 10, color: 'white'}}>Audi A3 - ABC123</Text>

                    <TouchableOpacity style={{backgroundColor: '#ffffff', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor:'#404255', borderWidth:1, width: '85%', height: '42.5%'}}>
                      <View style={{height: 30, width: 30, borderRadius: 5, marginRight: 7.5}}></View>

                      <Text style={{color: '#404255', fontWeight: 'bold'}}> Change</Text>
                    </TouchableOpacity>

                  </View>
              </View>                    
            </ThemedCardSecondary>
                     
            <View style={{height: "30%", width: "100%", marginBottom: 10, marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: theme.backgroundColour}}>
              <View style={[styles.showMoreButton,{width: '77%', height: '80%', alignItems: 'flex-start', flexDirection:'column'}]}>

                <View style={{flex: 1, flexDirection: 'row'}}>

                  <View style={{marginLeft: 5, width: '15%', height: '100%', borderRadius: 10, borderColor:'#a0a0aa', borderWidth: 0.5}}></View>

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

              <View style={[styles.showMoreButton,{width: '12.5%', height: '80%', alignItems: 'flex-start', flexDirection:'row', marginLeft: 5}]}>
                
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
        onMarkerPress={(e) => console.log(e)}
        rotateEnabled={false}
        showsUserLocation
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 51.5074, longitude: -0.1278 }}
          title="Mechanic"
        />
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