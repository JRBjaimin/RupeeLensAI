import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import { useAppStore } from '../../store/useAppStore';

const imgSpotifyCover = require('../../assets/images/insights/spotify-cover.png');
const imgVerified = require('../../assets/images/insights/verified.png');
const imgLateNight = require('../../assets/images/insights/late-night-icon.png');
const imgSubscriptions = require('../../assets/images/insights/subscriptions-icon.png');
const imgOpportunity1 = require('../../assets/images/insights/opportunity-1.png');
const imgChevron = require('../../assets/images/insights/chevron.png');
const imgOpportunity2 = require('../../assets/images/insights/opportunity-2.png');

type InsightsScreenProps = {
  onOpenIntelligenceFeed?: () => void;
};

const InsightsScreen = ({ onOpenIntelligenceFeed }: InsightsScreenProps) => {
  const { insights, loadTransactions } = useAppStore();

  React.useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const primaryInsight =
    insights[0]?.title ??
    'Save ₹1,800/month by optimizing your subscription and dining habits';
  const secondaryInsight =
    insights[1]?.title ?? 'Late-night spending detected';
  const tertiaryInsight =
    insights[2]?.title ?? '3 new subscriptions detected this month';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.glowLeft} />
        <View style={styles.glowRight} />
        <View style={styles.bgCircleTopRight} />
        <View style={styles.bgCircleLeft} />
        <View style={styles.bgCircleMidRight} />
        <View style={styles.bgCircleBottomLeft} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Insights</Text>
            <Text style={styles.heroSubtitle}>AI-powered guidance across your vaults</Text>
          </View>
          <Pressable
            onPress={onOpenIntelligenceFeed}
            style={({ pressed }) => [
              styles.heroCard,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.heroBadge}>
              <Image source={imgVerified} style={styles.badgeIcon} />
              <Text style={styles.badgeText}>VERIFIED AI INSIGHT</Text>
            </View>
            <Text style={styles.heroTitle}>{primaryInsight}</Text>
            <Text style={styles.heroBody}>
              Based on your spending patterns from the last 30 days.
            </Text>
            <View style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Execute Optimization</Text>
            </View>
          </Pressable>

          <View style={styles.cardColumn}>
            <Pressable
              onPress={onOpenIntelligenceFeed}
              style={({ pressed }) => [
                styles.cardLarge,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardRow}>
                <Image source={imgLateNight} style={styles.cardIcon} />
                <Text style={styles.cardTag}>HIGH IMPACT</Text>
              </View>
              <Text style={styles.cardTitle}>{secondaryInsight}</Text>
              <Text style={styles.cardBody}>
                We noticed a 40% increase in food delivery orders after 11 PM
                this week. Total impact: ₹2,450.
              </Text>
              <View style={styles.progressRow}>
                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                </View>
                <Text style={styles.progressLabel}>75% Frequency</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onOpenIntelligenceFeed}
              style={({ pressed }) => [
                styles.cardLargeAlt,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardRow}>
                <Image source={imgSubscriptions} style={styles.cardIcon} />
                <Text style={styles.cardTitleSmall}>{tertiaryInsight}</Text>
              </View>
              <View style={styles.subRow}>
                <Text style={styles.subLabel}>Streaming Svc</Text>
                <Text style={styles.subValue}>₹499/mo</Text>
              </View>
              <View style={styles.subRow}>
                <Text style={styles.subLabel}>Cloud Storage</Text>
                <Text style={styles.subValue}>₹130/mo</Text>
              </View>
              <View style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Review All</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onOpenIntelligenceFeed}
              style={({ pressed }) => [
                styles.spotifyCard,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.spotifyRow}>
                <View style={styles.spotifyCoverWrap}>
                  <Image source={imgSpotifyCover} style={styles.spotifyCover} />
                </View>
                <View style={styles.spotifyText}>
                  <Text style={styles.spotifyTitle}>Switch to a family plan for Spotify</Text>
                  <Text style={styles.spotifySavings}>Save ₹450/mo</Text>
                  <Text style={styles.spotifyBody}>
                    AI detected 3 separate accounts in your household.
                  </Text>
                </View>
              </View>
              <View style={styles.spotifyButton}>
                <Text style={styles.spotifyButtonText}>Invite Members</Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.savingsHeader}>
            <Text style={styles.savingsTitle}>Savings Opportunities</Text>
            <Text style={styles.savingsLink}>See All</Text>
          </View>
          <View style={styles.savingsList}>
            <View style={styles.savingsCard}>
              <View style={styles.savingsInfo}>
                <View style={styles.savingsIconWrap}>
                  <Image source={imgOpportunity1} style={styles.savingsIcon} />
                </View>
                <View>
                  <Text style={styles.savingsCardTitle}>Renegotiate Broadband</Text>
                  <Text style={styles.savingsCardMeta}>Potential: ₹300/mo savings</Text>
                </View>
              </View>
              <Image source={imgChevron} style={styles.chevron} />
            </View>
            <View style={styles.savingsCard}>
              <View style={styles.savingsInfo}>
                <View style={styles.savingsIconWrap}>
                  <Image source={imgOpportunity2} style={styles.savingsIcon} />
                </View>
                <View>
                  <Text style={styles.savingsCardTitle}>Optimize Grocery Day</Text>
                  <Text style={styles.savingsCardMeta}>Potential: ₹1,200/mo savings</Text>
                </View>
              </View>
              <Image source={imgChevron} style={styles.chevron} />
            </View>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default InsightsScreen;
