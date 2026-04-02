import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TransactionItem = () => {
  return (
    <View style={styles.row}>
      <Text style={styles.merchant}>Merchant</Text>
      <Text style={styles.amount}>-0.00</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  merchant: {
    color: '#E8EAFB',
    fontSize: 14,
  },
  amount: {
    color: '#FF6E84',
    fontWeight: '700',
  },
});

export default TransactionItem;
