import { Slot, useRouter, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    async function getDeviceId() {
      let id = await SecureStore.getItemAsync("deviceId");
      if (!id) {
        id = uuidv4(); // generate a new UUID
        await SecureStore.setItemAsync("deviceId", id);
      }
      console.log("Device ID:", id);
      setDeviceId(id);
    }
    getDeviceId();
  }, []);
  // -----------------------------------

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {!hideSidebar && (
        <View style={styles.sideborder}>
          <TouchableOpacity style={styles.navigationbutton} onPress={() => router.push('/live')}>
            <Text style={styles.buttonText}>Live</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationbutton} onPress={() => router.push('/workshop')}>
            <Text style={styles.buttonText}>Workshop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationbutton} onPress={() => router.push('/technicians')}>
            <Text style={styles.buttonText}>Technicians</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.background}>
        <Slot deviceId={deviceId} />
      </View>

      <TouchableOpacity style={styles.hamburgerItem} onPress={toggleSidebar} />
    </View>
  );
};


export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#18181b',
    padding: 5,
  },
  background: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#242638',
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 15,
    left: 15,
    width:65,
    height:65,
    backgroundColor:'white',
    borderRadius: 15,
    padding:5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});