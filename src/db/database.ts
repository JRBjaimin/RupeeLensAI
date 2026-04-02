import { open } from 'react-native-nitro-sqlite';

export const db = open({
  name: 'rupeelens.db',
});
