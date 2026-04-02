import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/transactions/styles';

const SummaryCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) => (
  <View style={[styles.summaryCard, { borderColor: `${accent}66` }]}> 
    <Text style={[styles.summaryLabel, { color: accent }]}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

export default SummaryCard;
