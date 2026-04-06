import { create } from 'zustand';

export type ProfileData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatarUri?: string;
  dob?: string; // DD/MM/YYYY
};

type ProfileState = {
  profile: ProfileData;
  updateProfile: (data: ProfileData) => void;
  resetProfile: () => void;
};

const defaultProfile: ProfileData = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@quantum-finance.io',
  phone: '+91 98765 43210',
  city: 'Mumbai',
  avatarUri: undefined,
  dob: '12/08/1994',
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: defaultProfile,
  updateProfile: (data) => set({ profile: data }),
  resetProfile: () => set({ profile: defaultProfile }),
}));
