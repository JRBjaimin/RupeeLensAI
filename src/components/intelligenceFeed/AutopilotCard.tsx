import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/intelligenceFeed/styles';

const AutopilotCard = () => (
  <View style={styles.autopilotCard}>
    <Text style={styles.autopilotTitle}>AI Autopilot</Text>
    <Text style={styles.autopilotBody}>
      Let RupeeLens automatically rebalance your sweep-in accounts for maximum yield.
    </Text>
    <Text style={styles.autopilotLink}>Enable Autopilot →</Text>
  </View>
);

export default AutopilotCard;
