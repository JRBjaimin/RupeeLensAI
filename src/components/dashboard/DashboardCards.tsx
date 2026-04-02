import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/dashboard/styles';

export const TxnCard = ({
  title,
  subtitle,
  amount,
  badge,
  accent,
  icon,
}: {
  title: string;
  subtitle: string;
  amount: string;
  badge: string;
  accent: string;
  icon: React.ReactNode;
}) => (
  <View style={[styles.txnCard, { borderColor: `${accent}55` }]}> 
    <View style={[styles.txnIconWrap, { borderColor: `${accent}66` }]}> 
      {icon}
    </View>
    <View style={styles.txnBody}>
      <Text style={styles.txnTitle}>{title}</Text>
      <Text style={styles.txnSubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.txnRight}>
      <Text style={styles.txnAmount}>{amount}</Text>
      <Text style={[styles.txnBadge, { color: accent }]}>{badge}</Text>
    </View>
  </View>
);
