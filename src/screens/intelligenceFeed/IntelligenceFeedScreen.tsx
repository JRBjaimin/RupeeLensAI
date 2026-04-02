import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import {
  AutopilotCard,
  BackIcon,
  BasketIcon,
  CardIcon,
  ClockIcon,
  FamilyIcon,
  FeedCard,
  HeroInsightCard,
  PlusIcon,
  PredictionCard,
  SavingsItem,
  SubIcon,
  WifiIcon,
} from '../../components/intelligenceFeed';
import { useAppStore } from '../../store/useAppStore';

type IntelligenceFeedScreenProps = {
  onBack?: () => void;
};

const IntelligenceFeedScreen = ({ onBack }: IntelligenceFeedScreenProps) => {
  const { insights, loadTransactions } = useAppStore();

  React.useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const feedItems = insights.slice(0, 3).map((item) => ({
    tag: item.tag ?? item.type.toUpperCase().replace('_', ' '),
    title: item.title,
    body: item.body,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.glowTop} />
        <View style={styles.glowLeft} />
        <View style={styles.glowRight} />
        <View style={styles.glowBottom} />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable onPress={onBack} style={styles.backButton}>
              <BackIcon />
            </Pressable>
            <Text style={styles.headerTitle}>Intelligence Feed</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <HeroInsightCard />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Intelligence Feed</Text>
            <Text style={styles.sectionMeta}>Last updated 2m ago</Text>
          </View>

          <View style={styles.feedSpacer}>
            {feedItems.length > 0 ? (
              feedItems.map((item, index) => (
                <FeedCard
                  key={`${item.title}-${index}`}
                  tag={item.tag}
                  title={item.title}
                  body={item.body ?? 'Based on your recent transactions and patterns.'}
                  icon={
                    index === 0 ? (
                      <ClockIcon />
                    ) : index === 1 ? (
                      <SubIcon />
                    ) : (
                      <FamilyIcon color="#FF9ED5" />
                    )
                  }
                />
              ))
            ) : (
              <>
                <FeedCard
                  tag="BEHAVIORAL"
                  title="Late-night spending detected at 11:30 PM"
                  body="Impulse food delivery orders are 24% higher during this window."
                  icon={<ClockIcon />}
                />
                <FeedCard
                  tag="FIXED COST"
                  title="3 new subscriptions detected this month"
                  body="Your recurring digital spend has increased by ₹749 since last month."
                  icon={<SubIcon />}
                />
                <FeedCard
                  tag="RECOMMENDATION"
                  title="Switch to a family plan for Spotify"
                  body="Two other household members are paying individual rates. Total saving: ₹450/mo."
                  icon={<FamilyIcon color="#FF9ED5" />}
                />
              </>
            )}
          </View>

          <View style={styles.savingsHeader}>
            <Text style={styles.savingsTitle}>Actionable Savings</Text>
          </View>

          <View style={styles.feedSpacer}>
            <SavingsItem
              title="Renegotiate Broadband"
              meta="Potential save: ₹300/mo"
              icon={<WifiIcon />}
              right={(
                <View style={styles.addButton}>
                  <PlusIcon />
                </View>
              )}
            />
            <SavingsItem
              title="Switch Fuel Credit Card"
              meta="Cashback boost: 4.5%"
              icon={<CardIcon />}
              right={(
                <View style={styles.addButton}>
                  <PlusIcon />
                </View>
              )}
            />
            <SavingsItem
              title="Optimize Grocery Day"
              meta="Shopping on Wed saves avg ₹650"
              icon={<BasketIcon />}
              right={(
                <View style={styles.addButton}>
                  <PlusIcon />
                </View>
              )}
            />
          </View>

          <PredictionCard />

          <AutopilotCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default IntelligenceFeedScreen;
