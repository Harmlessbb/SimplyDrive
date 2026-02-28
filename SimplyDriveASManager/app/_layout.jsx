import { Slot, useRouter, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const RootLayout = () => {


  const router = useRouter();
  const pathname = usePathname();

  const autoHideSidebar = pathname.startsWith('/noborder');
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const hideSidebar = autoHideSidebar || sidebarHidden;

  const toggleSidebar = () => setSidebarHidden(prev => !prev);

  // --------- DEVICE ID LOGIC ---------
  const [deviceId, setDeviceId] = useState(null);

async function getDeviceId() {

  let id = await SecureStore.getItemAsync("deviceId");
  if (!id) {
    id = uuidv4(); // generate a new UUID
    await SecureStore.setItemAsync("deviceId", id);
  }
  console.log("Device ID:", id);
  setDeviceId(id);
}

async function loadFonts() {
  await Font.loadAsync({
    'Michroma-Regular': require('../assets/fonts/Michroma-Regular.ttf'),
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
    
  });
  //setFontsLoaded(true);
}

useEffect(() => {


  loadFonts();
  getDeviceId();

}, []);
  // -----------------------------------

  return (
    <View style={styles.container}>


      <View style={styles.background}>
        <Slot deviceId={deviceId} />
      </View>


    </View>
  );
};


export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  sideborder: {
    flexDirection: 'column',
    flex: 0.255,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 200,
    paddingHorizontal: 0,
  },
  navigationbutton: {
    width: '95%',
    height: 50,
    backgroundColor: '#27272c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  hamburgerItem:
  {
    position:'absolute',
    top: 20,
    left: 20,
    width:65,
    height:65,
    backgroundColor:'#ffffff',
    borderColor:'#bbbcc3',
    borderWidth:3,
    borderRadius: 15,
    padding:5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});