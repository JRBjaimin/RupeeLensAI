import React, { useMemo } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import BottomTabBar from '../../components/BottomTabBar';
import { styles } from './styles';
import {
  BagMiniIcon,
  CashMiniIcon,
  ForkMiniIcon,
  LightningIcon,
  TxnCard,
  UpTrendIcon,
} from '../../components/dashboard';
import { DashboardIcon } from '../../components/transactions';
import { AddExpenseHeaderButton } from '../../components/addExpense';
import { useAppStore } from '../../store/useAppStore';

type DashboardScreenProps = {
  onOpenIntelligenceFeed?: () => void;
  onOpenAddExpense?: () => void;
  onViewAllTransactions?: () => void;
};

const DashboardScreen = ({
  onOpenIntelligenceFeed,
  onOpenAddExpense,
  onViewAllTransactions,
}: DashboardScreenProps) => {
  const { transactions, insights, loadTransactions } = useAppStore();

  React.useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const summary = useMemo(() => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const byCategory = transactions.reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});

    const categories = Object.entries(byCategory)
      .map(([name, amount]) => ({
        name,
        amount,
        percent: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return {
      total,
      recent: transactions.slice(0, 3),
      topInsight: insights[0]?.title ?? 'No insights yet. Add some transactions.',
      categories,
    };
  }, [transactions, insights]);

  const formatCurrency = (value: number) =>
    `₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food':
        return <ForkMiniIcon />;
      case 'Shopping':
        return <BagMiniIcon />;
      case 'Bills':
      case 'Housing':
        return <CashMiniIcon />;
      default:
        return <BagMiniIcon />;
    }
  };

  const getAccent = (category: string) => {
    switch (category) {
      case 'Food':
        return '#23E0FF';
      case 'Shopping':
        return '#B9A7FF';
      case 'Bills':
      case 'Housing':
        return '#FF97D4';
      default:
        return '#B9A7FF';
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.glowTop} />
        <View style={styles.glowRight} />
        <View style={styles.glowBottom} />
        <AppHeader
          title="RupeeLens AI"
          left={(
            <View style={styles.brandIcon}>
              <DashboardIcon color="#A7AABA" />
            </View>
          )}
          right={onOpenAddExpense ? <AddExpenseHeaderButton onPress={onOpenAddExpense} /> : null}
        />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>TOTAL MONTHLY SPEND</Text>
            <View style={styles.metricRow}>
              <Text style={styles.metricValue}>{formatCurrency(summary.total)}</Text>
            </View>
          </View>
          <View style={styles.metricPillRow}>
            <View style={styles.metricPill}>
              <View style={styles.metricPillIcon}>
                <UpTrendIcon />
              </View>
              <View>
                <Text style={styles.metricPillValue}>12%</Text>
                <Text style={styles.metricPillCaption}>vs last{'\n'}month</Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={onOpenIntelligenceFeed}
            style={({ pressed }) => [
              styles.insightCard,
              pressed && styles.insightCardPressed,
            ]}
          >
            <View style={styles.insightHeader}>
              <LightningIcon />
              <Text style={styles.insightLabel}>QUICK INSIGHT</Text>
            </View>
            <Text style={styles.insightTitle}>{summary.topInsight}</Text>
            <View style={styles.insightButton}>
              <Text style={styles.insightButtonText}>Optimize Budget</Text>
            </View>
          </Pressable>
          <Text style={styles.insightHint}>Tap to explore insights</Text>

          <View style={styles.splitCard}>
            <Text style={styles.sectionTitle}>Budget Split</Text>
            {summary.categories.length === 0 ? (
              <>
                <View style={styles.splitRow}>
                  <Text style={styles.splitLabel}>Food</Text>
                  <Text style={styles.splitValue}>0%</Text>
                </View>
                <View style={styles.splitTrack}>
                  <View style={[styles.splitFill, styles.splitFillFood, { width: '10%' }]} />
                </View>
              </>
            ) : (
              summary.categories.map((item) => {
                const accent =
                  item.name === 'Food'
                    ? '#2DE0FF'
                    : item.name === 'Shopping'
                      ? '#B1A6FF'
                      : '#FF9ED5';
                return (
                  <View key={item.name}>
                    <View style={styles.splitRow}>
                      <Text style={styles.splitLabel}>{item.name}</Text>
                      <Text style={styles.splitValue}>{item.percent}%</Text>
                    </View>
                    <View style={styles.splitTrack}>
                      <View
                        style={[
                          styles.splitFill,
                          { width: `${item.percent}%`, backgroundColor: accent },
                        ]}
                      />
                    </View>
                  </View>
                );
              })
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>Recent Transactions</Text>
            <Text
              style={styles.sectionHeaderAction}
              onPress={onViewAllTransactions}
            >
              View All
            </Text>
          </View>

          {summary.recent.map((txn) => (
            <TxnCard
              key={txn.id}
              title={txn.merchant}
              subtitle={`${txn.date} • ${txn.category}`}
              amount={`${txn.amount < 0 ? '-' : ''}${formatCurrency(txn.amount)}`}
              badge={txn.source.toUpperCase()}
              accent={getAccent(txn.category)}
              icon={getCategoryIcon(txn.category)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
