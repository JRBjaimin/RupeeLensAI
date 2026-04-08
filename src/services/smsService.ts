import { Platform } from 'react-native';
import { readSmsAndIngest as readSmsAndroid } from './smsService.android';
import { readSmsAndIngest as readSmsIos } from './smsService.ios';

export const readSmsAndIngest =
  Platform.OS === 'android' ? readSmsAndroid : readSmsIos;
