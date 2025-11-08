import { Slot, useRouter, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import React from 'react';

const RootLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const hideSidebar = pathname.startsWith('/noborder');

  const goToLivePage = () => router.push('/live');
  const goToWorkshopPage = () => router.push('/workshop');

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {!hideSidebar && (
        <View style={styles.sideborder}>
          <TouchableOpacity style={styles.navigationbutton} onPress={goToLivePage}>
            <Text style={styles.buttonText}>Live</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navigationbutton} onPress={goToWorkshopPage}>
            <Text style={styles.buttonText}>Workshop</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.background}>
        <Slot />
      </View>
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});