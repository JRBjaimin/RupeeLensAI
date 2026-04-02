import { create } from 'zustand';
import {
  checkRequiredPermissions,
  requestRequiredPermissions,
  PermissionState,
} from '../services/permissionService';

type PermissionStore = {
  status: PermissionState;
  refresh: () => Promise<void>;
  requestAll: () => Promise<void>;
};

const initial: PermissionState = {
  camera: 'unavailable',
  photo: 'unavailable',
  notifications: 'unavailable',
  sms: 'unavailable',
};

export const usePermissionStore = create<PermissionStore>((set) => ({
  status: initial,
  refresh: async () => {
    const next = await checkRequiredPermissions();
    set({ status: next });
  },
  requestAll: async () => {
    const next = await requestRequiredPermissions();
    set({ status: next });
  },
}));
