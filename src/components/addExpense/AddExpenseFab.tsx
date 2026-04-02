import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const AddExpenseFab = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.fab}>
    <Text style={styles.icon}>+</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 120,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(159,167,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(159,167,255,0.5)',
    shadowColor: '#B1A6FF',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  icon: {
    color: '#E8EAFB',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 26,
  },
});

export default AddExpenseFab;
