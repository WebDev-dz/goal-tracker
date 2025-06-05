import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './global.css';
import {AppNavigator} from './AppNavigator';

// Define the possible theme preferences
type ThemePreference = 'system' | 'light' | 'dark';

// Define the shape of the theme context
interface ThemeContextType {
  themePreference: ThemePreference;
  toggleTheme: (preference: ThemePreference) => void;
  isDarkMode: boolean; // Add isDarkMode to the context
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const systemColorScheme = useColorScheme();

  // Load theme preference from AsyncStorage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem('themePreference');
        if (savedPreference) {
          setThemePreference(savedPreference as ThemePreference);
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
      }
    };
    loadThemePreference();
  }, []);

  // Function to toggle theme preference and save it to AsyncStorage
  const toggleTheme = async (preference: ThemePreference) => {
    try {
      setThemePreference(preference);
      await AsyncStorage.setItem('themePreference', preference);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  // Determine the current mode based on preference and system setting
  const isDarkMode = themePreference === 'dark' || (themePreference === 'system' && systemColorScheme === 'dark');

  return (
    <ThemeContext.Provider value={{ themePreference, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemeProvider>
     
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        
        <AppNavigator />
      
    </ThemeProvider>
  );
}
