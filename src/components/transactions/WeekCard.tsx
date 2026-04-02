import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/transactions/styles';

export type WeekCardProps = {
  title: string;
  subtitle: string;
  amount: string;
  accent: string;
  icon: React.ReactNode;
  ghostIcon: React.ReactNode;
};

const WeekCard = ({ title, subtitle, amount, accent, icon, ghostIcon }: WeekCardProps) => (
  <View style={[styles.weekCard, { borderColor: `${accent}44`, shadowColor: accent }]}> 
    <View style={styles.weekTopRow}>
      <View style={[styles.weekIconWrap, { borderColor: `${accent}55` }]}>{icon}</View>
      <View style={styles.weekGhost}>{ghostIcon}</View>
    </View>
    <Text style={styles.weekTitle}>{title}</Text>
    <Text style={styles.weekSubtitle}>{subtitle}</Text>
    <Text style={styles.weekAmount}>{amount}</Text>
  </View>
);

export default WeekCard;
