import { Slot } from 'expo-router';
import { StyleSheet, View, ActivityIndicator, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  console.log(colorScheme);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Michroma-Regular': require('../assets/fonts/Michroma-Regular.ttf'),
        'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf'),
        'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
        'Satoshi-Variable': require('../assets/fonts/Satoshi-Variable.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  // Wait until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
