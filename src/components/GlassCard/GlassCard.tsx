import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const GlassCard = ({ style, ...props }: ViewProps) => {
  return <View style={[styles.card, style]} {...props} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(32,37,53,0.4)',
    borderColor: 'rgba(232,234,251,0.05)',
    borderWidth: 1,
    borderRadius: 24,
  },
});

export default GlassCard;
