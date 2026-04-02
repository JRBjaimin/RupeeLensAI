import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/intelligenceFeed/styles';

type SavingsItemProps = {
  title: string;
  meta: string;
  icon: React.ReactNode;
  right: React.ReactNode;
};

const SavingsItem = ({ title, meta, icon, right }: SavingsItemProps) => (
  <View style={styles.savingsCard}>
    <View style={styles.savingsInfo}>
      <View style={styles.savingsIconWrap}>{icon}</View>
      <View>
        <Text style={styles.savingsText}>{title}</Text>
        <Text style={styles.savingsMeta}>{meta}</Text>
      </View>
    </View>
    {right}
  </View>
);

export default SavingsItem;
