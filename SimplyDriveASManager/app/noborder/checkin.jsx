import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useState } from 'react';

const Checkin = () => {

  const router = useRouter();

  const goToLivePage = () => {
    router.push('/live')
  };

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [qrData, setQrData] = useState(null);
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

  async function setBookingStatusToOnsite(bookingID)
  {

   console.log(`Sending ${bookingID}`) 
    const numericBookingID = Number(bookingID);
    const url = `https://api.simplydrive.app/Api/Bookings/UpdateStatus?bookingID=${numericBookingID}&newStatus=onsite`;


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

            <View style={styles.bookingInfoContainer}>
              <View style={styles.bookingInfoUpperContainer}>

                {/* VEHICLE INFORMATION CARD */}
                <View style={styles.bookingInfoCard}>
                  <View style={styles.registrationInfoBlock}>
                    <Text style={[styles.componentText, { color: 'black' }, {fontSize: 50}]}>
                      {qrData.bookingDetails.registration}
                    </Text>
                  </View>
                </View>

                {/* CUSTOMER INFORMATION CARD */}
                <View style={styles.bookingInfoCard}> 
                  
                </View>  

                {/* BOOKING INFORMATION CARD */}
                <View style={styles.bookingInfoCard}> 
                  
                </View>  

              </View>

              <View style={styles.bookingInfoLowerContainer}>

                <TouchableOpacity
                  style={[styles.button, {marginVertical: 65}, {marginRight: 10}]}
                  onPress={goToLivePage}
                >
                  
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>      

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#17b26a' }, {marginVertical: 65}, {marginRight: 10}]}
                  onPress={() => setBookingStatusToOnsite(qrData.bookingDetails.bookingid)}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>  

              </View>
            </View>  

          </View>

         )}
        

        <Text style={styles.buttonText}>Awaiting QR Code...</Text>

        <TouchableOpacity style={styles.button} onPress={goToLivePage}>
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
    backgroundColor: '#4c4c4e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
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
});
