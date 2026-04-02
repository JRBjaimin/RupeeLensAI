import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabNavigator from './navigation/MainTabNavigator';
import { initDB } from './db/schema';
import { usePermissionStore } from './store/usePermissionStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const requestAll = usePermissionStore((s) => s.requestAll);
  useEffect(() => {
    initDB().catch((err) => {
      console.error('DB init failed', err);
    });
    requestAll().catch((err) => {
      console.error('Permission request failed', err);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainTabNavigator />
    </SafeAreaProvider>
  );
}

export default App;
