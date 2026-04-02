import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const AddExpenseHeaderButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.icon}>+</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(159,167,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(159,167,255,0.5)',
  },
  icon: {
    color: '#E8EAFB',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18,
  },
});

export default AddExpenseHeaderButton;
