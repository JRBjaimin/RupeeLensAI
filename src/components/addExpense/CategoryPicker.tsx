import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

type Props = {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
};

const defaultOptions = [
  'Food',
  'Shopping',
  'Bills',
  'Subscriptions',
  'Transport',
  'Others',
];

const CategoryPicker = ({ value, onChange, options = defaultOptions }: Props) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = value.toLowerCase() === option.toLowerCase();
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(12,16,28,0.6)',
  },
  chipActive: {
    borderColor: 'rgba(177,166,255,0.8)',
    backgroundColor: 'rgba(177,166,255,0.2)',
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.textPrimary,
  },
});

export default CategoryPicker;
