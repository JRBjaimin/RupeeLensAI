import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/transactions/styles';

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionLine} />
  </View>
);

export default SectionHeader;
