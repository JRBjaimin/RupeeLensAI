import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/intelligenceFeed/styles';

const PredictionCard = () => (
  <View style={styles.predictionCard}>
    <Text style={styles.predictionTitle}>Your Net Worth is</Text>
    <Text style={styles.predictionTitle}>
      projected to grow <Text style={styles.predictionAccent}>12%</Text>
    </Text>
    <Text style={styles.predictionTitle}>by Q4.</Text>
  </View>
);

export default PredictionCard;
