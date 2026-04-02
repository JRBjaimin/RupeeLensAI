import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlassCard from '../GlassCard';

const InsightCard = () => {
  return (
    <GlassCard style={styles.card}>
      <Text style={styles.title}>Insight</Text>
      <Text style={styles.body}>Replace with real insight data.</Text>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EAFB',
  },
  body: {
    marginTop: 8,
    fontSize: 12,
    color: '#A7AABA',
  },
});

export default InsightCard;
