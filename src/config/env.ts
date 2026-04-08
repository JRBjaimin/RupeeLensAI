import { Platform } from 'react-native';

const getGmailBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator loopback to host machine.
    return 'http://10.0.2.2:8787';
  }
  // iOS simulator + desktop dev
  return 'http://localhost:8787';
};

export const ENV = {
  APP_NAME: 'RupeeLens AI',
  get GMAIL_SYNC_BASE_URL() {
    return getGmailBaseUrl();
  },
  get GMAIL_AUTH_URL() {
    return `${getGmailBaseUrl()}/auth/google`;
  },
};
