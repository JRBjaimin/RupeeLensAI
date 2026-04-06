import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus, Platform, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabNavigator from './navigation/MainTabNavigator';
import { initDB } from './db/schema';
import { usePermissionStore } from './store/usePermissionStore';
import { useAppStore } from './store/useAppStore';
import { isGranted } from './services/permissionService';
import { readSmsAndIngest } from './services/smsService';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const requestAll = usePermissionStore((s) => s.requestAll);
  const refreshPermissions = usePermissionStore((s) => s.refresh);
  const loadTransactions = useAppStore((s) => s.loadTransactions);
  const syncingRef = useRef(false);

  const syncSmsIfAllowed = async () => {
    if (Platform.OS !== 'android') return;
    if (syncingRef.current) return;
    const { status } = usePermissionStore.getState();
    if (!isGranted(status.sms)) return;
    try {
      syncingRef.current = true;
      await readSmsAndIngest(80);
      await loadTransactions();
    } finally {
      syncingRef.current = false;
    }
  };

  useEffect(() => {
    initDB().catch((err) => {
      console.error('DB init failed', err);
    });
    requestAll().catch((err) => {
      console.error('Permission request failed', err);
    });
  }, []);

  useEffect(() => {
    refreshPermissions().then(syncSmsIfAllowed).catch(() => null);
  }, []);

  useEffect(() => {
    const handler = (state: AppStateStatus) => {
      if (state === 'active') {
        refreshPermissions().then(syncSmsIfAllowed).catch(() => null);
      }
    };
    const subscription = AppState.addEventListener('change', handler);
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MainTabNavigator />
    </SafeAreaProvider>
  );
}

export default App;
