import { Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestNotifications,
  checkNotifications,
} from 'react-native-permissions';

export type PermissionState = {
  camera: string;
  photo: string;
  notifications: string;
  sms: string;
};

const getCameraPermission = () =>
  Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }) as string;

const getPhotoPermission = () =>
  Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  }) as string;

const getSmsPermission = () =>
  Platform.select({
    ios: undefined,
    android: PERMISSIONS.ANDROID.READ_SMS,
  }) as string | undefined;

export const requestRequiredPermissions = async (): Promise<PermissionState> => {
  const camera = await request(getCameraPermission());
  const photo = await request(getPhotoPermission());
  const smsPermission = getSmsPermission();
  const sms = smsPermission ? await request(smsPermission) : 'unavailable';
  const notifications = (await requestNotifications(['alert', 'sound', 'badge'])).status;

  return {
    camera,
    photo,
    notifications,
    sms,
  };
};

export const checkRequiredPermissions = async (): Promise<PermissionState> => {
  const camera = await check(getCameraPermission());
  const photo = await check(getPhotoPermission());
  const smsPermission = getSmsPermission();
  const sms = smsPermission ? await check(smsPermission) : 'unavailable';
  const notifications = (await checkNotifications()).status;

  return {
    camera,
    photo,
    notifications,
    sms,
  };
};

export const isGranted = (status: string) => status === RESULTS.GRANTED || status === RESULTS.LIMITED;
