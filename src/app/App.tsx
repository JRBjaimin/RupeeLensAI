import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>RupeeLens AI</Text>
      <Text style={styles.subtitle}>App shell ready.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E8EAFB',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#A7AABA',
  },
});

export default App;
