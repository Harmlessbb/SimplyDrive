import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import "../../assets/calendar-icon.png"
import "../../assets/location-icon.png"
import UIDevider from '../../components/UIDevider'
const Checkin = () => {

const MOCK_QR_DATA = {
  bookingDetails: {
    bookingid: 123456,
    registration: "AB12 CDE",
    customerName: "John Smith",
    vehicle: "Audi A4",
    date: "2026-02-05",
    time: "10:30",
  },
};

  const router = useRouter();

  const goToLivePage = () => {
    router.push('/live')
  };

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [qrData, setQrData] = useState(MOCK_QR_DATA);
  let validStringFlagSent = false;


  async function validateQR(userID, bookingID, passcode)
  {
    try 
    {
      const url = `https://api.simplydrive.app/Api/QR/VarifyQRCode?userID=${userID}&bookingID=${bookingID}&QRpasscode=${passcode}`;

      console.log("FETCHING:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (data.message === "QR Code valid.") {
        setQrData(data)
        console.log("VALID QR")
        validStringFlagSent = true;
        setOverlayVisible(true);
      }

  } catch (err) {
    console.error("QR validation failed:", err);
    validStringFlagSent = false; 
  }

  }

  //CALLED ON QR SCAN
  const _onHiddenTextChangeText = (text) => {
      console.log("TEXT INPUTTED", text);

    if (text.includes('$')) {
        
        let validStringFlagSent = false;
        const [bookingID, userID, passcodePart] = text.split('@');
        const passcode = passcodePart.replace('$', '');

        console.log({ userID, bookingID, passcode});

        if (userID && bookingID && passcode && !validStringFlagSent)
        {
            validStringFlagSent = true; 
            validateQR(userID, bookingID, passcode)   
          
        }
  }
  }; 

  async function setBookingStatusToInWorkshop(bookingID)
  {

   console.log(`Sending ${bookingID}`) 
    const numericBookingID = Number(bookingID);
    const url = `https://api.simplydrive.app/Api/Bookings/UpdateStatus?bookingID=${numericBookingID}&newStatus=inworkshop`;


    fetch(url, { method: "PUT" })
        .then(res => res.json())
        .then(data => console.log("Response:", data))
        .catch(err => console.error("Error:", err));  

    goToLivePage()
    
  }

  
  return (

      <View style={styles.container}>

        {overlayVisible &&(

          <View style={styles.containerCover}>

            <View style={{height:'80%', width:'100%', flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
              
              <View style={{width:'30%', height:'90%', backgroundColor:'#ffffff', marginTop: 50, borderRadius: 25, overflow: 'hidden',}}>
                <ImageBackground source={require('../../assets/car-placeholder-img.png')} style={{width:'100%', height:'100%'}} >

                  <View style={{height:'60%'}}></View>
                  <View style={{height:'40%', backgroundColor:'#0000006F', alignContent: 'flex-start', justifyContent:'flex-start', padding:15}}>
                    <Text style={{fontSize: 35, color:'#FFFFFF'}}> 2020 Honda Civic </Text>

                    <Text style={{fontSize: 20, color:'#FFFFFF', marginTop: 25}}> Silver • ABC-123 • 57,449 mi  </Text>  

                    <Text style={{fontSize: 20, color:'#FFFFFF', marginTop: 5}}> Last check up: 22-05-2020  </Text>                                 
                  </View>
                </ImageBackground>
              </View>

              <View style={{width:'30%', height:'90%', backgroundColor:'#EEEEF0', borderRadius: 25, borderColor:'#BBBCC3', borderWidth: 1, marginTop: 50, marginHorizontal: 20 }}>


              </View>

              <View style={{width:'30%', height:'90%', backgroundColor:'#ffffff', marginTop: 50, borderRadius: 25, overflow: 'hidden'}}>
                
                <ImageBackground source={require('../../assets/lightmodebg.jpg')} style={{width:'100%', height:'100%' , opacity: 0.8}} >
                <View style={styles.bgOverlay} />

                <View style={{height: 75, padding: 20}}>
                  <Text style={{fontSize: 28, fontWeight:'bold'}}>Booking Summery</Text>

                </View>
                  <UIDevider/>
                
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

                          <View
                            style={{
                              justifyContent: 'flex-start',
                              alignContent: 'center'
                            }}
                          >
                            <Text style={{ fontSize: 16 }}>
                              September 16th 2026
                            </Text>

                            <Text style={{ fontSize: 16 }}>
                              9:00 Check-In
                            </Text>
                          </View>

                    </View>


                </View>
                
                <UIDevider />                

      <View style={{ flex: 0.95, justifyContent: 'flex-start', marginTop: 20 }}>
        <View style={{ height: '10%', width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-even'}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            Oil Change
          </Text>

                    <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 26,
              fontWeight: 'bold',
              marginLeft: 100,
              
            }}
          >
            £99.99
          </Text>

        </View>


        <Text
          style={{
            fontSize: 14,
            marginTop: 0,
            marginLeft: 10,

            color: '#666',
          }}
        >
          Basic Oil and Filter Change
        </Text>
      </View>

                </ImageBackground>          
                
                      
              </View>
            </View>

            <View style={{height:'30%', width:'100%', flexDirection: 'row', justifyContent:'center'}}>
              
              <TouchableOpacity style={[styles.button, {marginTop: 50, marginRight:40, elevation: 10, backgroundColor:'#ffffff' }]} onPress={() => router.replace('/')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              
              <TouchableOpacity
                style={[styles.button, { marginTop: 50,  elevation: 15, backgroundColor:'#FF6B35', borderColor:'#D62828' }]}
                onPress={() => {setBookingStatusToInWorkshop(6); router.push('/');}}>

                <Text style={[styles.buttonText, {color:'#ffffff'}]}>Check-In</Text>

              </TouchableOpacity>

            </View>

          </View>

         )}
        
        
        <View style={{height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>

          <Text style={{color:'#404255', marginBottom: 50, fontSize: 44, fontWeight:'bold'}}> Awaiting QR Code... </Text>

          <View style={{height: 250, width: 250, borderRadius:250, borderColor: '#D5D5D9', borderWidth:1, backgroundColor:'#ffffff', justifyContent:'center', alignItems:'center', elevation:15 }}>
              <Image
                source={require('../../assets/Qr-Icon.png')}
                style={{ width: '50%', height: '50%', alignSelf: 'center', marginBottom: 0, resizeMode:'contain' }}>
                
              </Image>
          </View>

          <TouchableOpacity style={[styles.button, {marginTop: 50, }]} onPress={() => router.replace('/')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <View style={{ width: 0, height: 0 }}>
            <TextInput
              style={styles.hiddenInput}
              autoFocus={true}
              multiline
              //onFocus={Keyboard.dismiss}
              onChangeText={_onHiddenTextChangeText}
              // value={state.hiddenInput}
            />
          </View>

        </View>

      </View>
  );
};

export default Checkin;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerCover: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor:'#242638bf',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
  },

  bookingInfoContainer:
  {
    flex:0.75,
    width: 1200,
    backgroundColor:'#18181b',
    borderRadius:15,
    borderColor:'#b5abab',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  bookingInfoUpperContainer: {
    flex: 0.75,
    width: '95%',
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between', 
    alignItems: 'center',         
    marginTop:20,  
    //paddingHorizontal: 5,           
  },

  bookingInfoCard: {
    //flex: 1,               
    backgroundColor: '#272b2c',
    width: '32%',
    height: '95%',          
    marginHorizontal: 5,   
    borderRadius: 10,   
    justifyContent: 'flex-end',
    alignItems: 'center',   
  }, 
  registrationInfoBlock:
  {

    //flex: 0.6,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#eabe13',
    width: 300,
    height: 80,
    margin: 2,
    borderRadius: 15,
    marginBottom: 10,
  },
  

  bookingInfoLowerContainer:
  {
    flex:0.25,
    width: '100%',
    //backgroundColor:'red',
    alignContent:'flex-end',
    justifyContent:'flex-end',
    flexDirection:'row'
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

componentText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },  
  hiddenInput: {
    width: 0,
    height: 0,
  },
    bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },
});
