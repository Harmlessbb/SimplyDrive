import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [selectedVehicles, setSelectedVehicles] = useState({}); 


  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const saved = await SecureStore.getItemAsync('selectedVehicles');
        if (saved) setSelectedVehicles(JSON.parse(saved));
      } catch (e) {
        console.log('Error loading vehicles from storage', e);
      }
    };
    loadVehicles();
  }, []);

  useEffect(() => {
    const saveVehicles = async () => {
      try {
        await SecureStore.setItemAsync(
          'selectedVehicles',
          JSON.stringify(selectedVehicles)
        );
      } catch (e) {
        console.log('Error saving vehicles to storage', e);
      }
    };
    saveVehicles();
  }, [selectedVehicles]);

  const selectVehicle = (key, vehicle) => {
    setSelectedVehicles((prev) => ({ ...prev, [key]: vehicle }));
  };

  const deselectVehicle = (key) => {
    setSelectedVehicles((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

    const clearVehicles = () => setSelectedVehicles({});


  return (
    <VehicleContext.Provider
      value={{
        selectedVehicles,
        selectVehicle,
        deselectVehicle,
        clearVehicles,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
