import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import { styles } from './styles';
import {
  BagIcon,
  BoltIcon,
  CarIcon,
  CashIcon,
  DashboardIcon,
  ForkIcon,
  MoneyNoteIcon,
  PlayIcon,
  SearchIcon,
  ShoppingIcon,
  SectionHeader,
  SummaryCard,
  TransactionCard,
  WeekCard,
} from '../../components/transactions';
import { useAppStore } from '../../store/useAppStore';
import { AddExpenseHeaderButton } from '../../components/addExpense';
import { readSmsAndIngest } from '../../services/smsService';
import { usePermissionStore } from '../../store/usePermissionStore';
import { isGranted } from '../../services/permissionService';
import { deleteTransaction } from '../../services/transactionService';

type TimeFilter = 'Today' | 'Week' | 'Month';

type TransactionsScreenProps = {
  onOpenAddExpense?: () => void;
};

const TransactionsScreen = ({ onOpenAddExpense }: TransactionsScreenProps) => {
  const { transactions, loadTransactions, isSyncing, setIsSyncing } = useAppStore();
  const [filter, setFilter] = useState<TimeFilter>('Today');
  const permissionStatus = usePermissionStore((s) => s.status);

  React.useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filtered = useMemo(() => {
    if (!transactions.length) return [];
    const now = new Date();
    const start = new Date(now);

    if (filter === 'Today') {
      start.setHours(0, 0, 0, 0);
    } else if (filter === 'Week') {
      start.setDate(now.getDate() - 6);
    } else {
      start.setMonth(now.getMonth() - 1);
    }

    return transactions.filter((txn) => {
      const dt = new Date(txn.date);
      return dt >= start && dt <= now;
    });
  }, [transactions, filter]);

  const formatAmount = (value: number) =>
    `${value < 0 ? '-' : ''}₹${Math.abs(value).toLocaleString('en-IN')}`;

  const handleSync = async () => {
    if (Platform.OS !== 'android') return;
    if (!isGranted(permissionStatus.sms)) return;
    setIsSyncing(true);
    try {
      await readSmsAndIngest(100);
      await loadTransactions();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTransaction(id);
          await loadTransactions();
        },
      },
    ]);
  };

  const formatChannel = (txn: typeof transactions[number]) => {
    const text = (txn.rawText ?? '').toLowerCase();
    if (text.includes('upi')) return 'UPI';
    if (text.includes('card') || text.includes('pos')) return 'CARD';
    if (text.includes('imps') || text.includes('neft') || text.includes('rtgs')) return 'BANK';
    if (text.includes('atm') || text.includes('cash')) return 'ATM';
    return txn.source.toUpperCase();
  };

  const formatReadable = (txn: typeof transactions[number]) => {
    if (txn.source !== 'sms') return 'MANUAL ENTRY';
    if (txn.summary) return txn.summary;
    const channel = formatChannel(txn);
    const merchant = txn.merchant || 'Unknown';
    return `${channel} • ${merchant}`;
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
          right={(
            <View style={styles.topActions}>
              <Pressable
                style={[
                  styles.syncButton,
                  (Platform.OS !== 'android' || !isGranted(permissionStatus.sms)) &&
                    styles.syncButtonDisabled,
                ]}
                onPress={handleSync}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.syncText}>SYNC</Text>
                )}
              </Pressable>
              <SearchIcon />
              {onOpenAddExpense ? <AddExpenseHeaderButton onPress={onOpenAddExpense} /> : null}
            </View>
          )}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Transactions</Text>
            <Text style={styles.heroSubtitle}>
              AI-powered tracking across all vaults
            </Text>
            <View style={styles.segmented}>
              {(['Today', 'Week', 'Month'] as TimeFilter[]).map((item) => {
                const isActive = item === filter;
                return isActive ? (
                  <View key={item} style={styles.segmentActive}>
                    <Text style={styles.segmentActiveText}>{item}</Text>
                  </View>
                ) : (
                  <Text
                    key={item}
                    style={styles.segmentText}
                    onPress={() => setFilter(item)}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={styles.summaryStack}>
            <SummaryCard
              label="NET SPEND"
              value={`₹${filtered.reduce((sum, t) => sum + t.amount, 0).toLocaleString('en-IN')}`}
              accent="#35C9FF"
            />
            <SummaryCard
              label="AI OPTIMIZED"
              value="₹3,210.00"
              accent="#9A7BFF"
            />
            <SummaryCard
              label="SAVINGS RATE"
              value="24.5%"
              accent="#FF7DA8"
            />
          </View>

          <SectionHeader title={filter.toUpperCase()} />

          {filtered.map((txn) => (
            <TransactionCard
              key={txn.id}
              title={txn.merchant}
              subtitle={formatReadable(txn)}
              meta={txn.category}
              amount={formatAmount(txn.amount)}
              time={new Date(txn.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              accent="#35C9FF"
              icon={<MoneyNoteIcon color="#35C9FF" />}
              useLinearIconBg
              badge={txn.aiUsed ? 'AI' : undefined}
              onLongPress={() => handleDelete(txn.id)}
            />
          ))}

          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No transactions yet</Text>
              <Text style={styles.emptyBody}>Add a manual expense to get started.</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TransactionsScreen;
