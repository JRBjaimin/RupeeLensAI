import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/intelligenceFeed/styles';

const HeroInsightCard = () => (
  <View style={styles.heroCard}>
    <View style={styles.heroBadge}>
      <Text style={styles.heroBadgeText}>PRIME INSIGHT</Text>
    </View>
    <Text style={styles.heroTitle}>
      You can save <Text style={styles.heroTitleAccent}>₹1,800/month</Text> by
    </Text>
    <Text style={styles.heroTitle}>optimizing your subscription and dining habits.</Text>
    <View style={styles.heroButton}>
      <Text style={styles.heroButtonText}>Optimize Now</Text>
    </View>
  </View>
);

export default HeroInsightCard;
