import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React from 'react';

const Checkin = () => {
  const router = useRouter();

  const goToLivePage = () => {
    router.push('/live')
  };

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
        console.log("VALID QR")
        validStringFlagSent = true;
      }
  } catch (err) {
    console.error("QR validation failed:", err);
    validStringFlagSent = false; 
  }

  }

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

  return (
    <View style={styles.container}>
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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  hiddenInput: {
    width: 0,
    height: 0,
  },
});
