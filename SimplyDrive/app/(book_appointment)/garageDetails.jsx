import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import UIDevider from '../../components/UIDevider'

const garageDetails = () => {
  return (

        <ScrollView style={{backgroundColofr: '#fffff'}}>

            <View style={{height: 250, width: '100%'}}>
                <ImageBackground style={{width: '100%', height: '100%', resizeMode: 'fill', justifyContent: 'flex-end'}} source={require('../../assets/garage-stock.png')}>
                    <View style={{flex: 0.45, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center'}}>

                        <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>Your Garage</Text>

                        <Text style={{color: '#ffffff', fontSize: 16, marginTop: 5}}>1234 Road Town, City Garage</Text>


                    </View>
                </ImageBackground>
            </View>
            
            <View style={{height: 67.5, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, marginTop: 10}}>
                <TouchableOpacity style={[styles.upcomingBookingsButton, {marginRight: 7.5}]}> 
                    <Text> Call </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.upcomingBookingsButton}> 
                    <Text> Directions </Text>
                </TouchableOpacity>
            </View>


            <View style={{height: 220, width: '95%', backgroundColor: '#E6E6E8', borderColor: '#D5D5D9', borderWidth: 1, padding: 15, marginTop: 20, alignSelf: 'center', borderRadius: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Contact Information</Text>
                <UIDevider style={{width: '100%'}}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, justifyContent: 'center', marginTop: 15}}>
                    <View style={{flex: 0.175}}>

                        <View style={{width: 50, height: 50, borderRadius: 10, backgroundColor: '#FFFFFF', borderColor: '#BBBCC3', borderWidth: 1, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../../assets/location-icon.png')}
                                style={{width: '40%', height: '60%', resizeMode: 'contain'}}
                            ></Image>
                        </View>

                        <View style={{width: 50, height: 50, borderRadius: 10, backgroundColor: '#FF6B35', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../../assets/phone-icon.png')}
                                style={{width: '40%', height: '60%', resizeMode: 'contain'}}
                            ></Image>
                        </View>

                    </View>
                    <View style={{flex: 0.8, alignContent: 'flex-start', justifyContent: 'center'}}>

                        <Text style={{fontWeight: 'bold', }}> Address </Text>
                        <Text style={{marginBottom: 15}}> 1234 Road Town, City Garage </Text>

                        <Text style={{fontWeight: 'bold'}}> Phone </Text>
                        <Text style={{marginBottom: 12.5}}> (555) 456-7890 </Text>
                    </View>
                </View>
            </View>

            <View style={{height: 200, width: '95%', backgroundColor: '#E6E6E8', borderColor: '#D5D5D9', borderWidth: 1, padding: 15, marginTop: 40, alignSelf: 'center', borderRadius: 15}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>About</Text>
                <UIDevider style={{width: '100%'}}/>

                <Text style={{marginTop: 15, fontSize: 14, lineHeight: 20, fontSize: 16}}>Your Garage has been providing top-notch automotive services to the local community for many years, let us help you connect with your customers and handle bookings the mordern way. </Text>

            </View>
            
            
            <View style={{height: 150, width: '95%'}}>

            </View>
        </ScrollView>
  )
}

export default garageDetails

const styles = StyleSheet.create({

      upcomingBookingsButton:
  {
    width: '47%', 
    height: '95%',
    borderColor: '#bbbcc3',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.75,
    borderRadius: 10,
  }

})