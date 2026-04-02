import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabBar, { TabKey } from '../components/BottomTabBar/BottomTabBar';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TransactionsScreen from '../screens/transactions/TransactionsScreen';
import IntelligenceFeedScreen from '../screens/intelligenceFeed/IntelligenceFeedScreen';
import { colors } from '../theme';
import AddExpenseModal from '../screens/addExpense/AddExpenseModal';

type DetailScreen = 'IntelligenceFeed' | null;

const MainTabNavigator = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Dashboard');
  const [detailScreen, setDetailScreen] = useState<DetailScreen>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const insets = useSafeAreaInsets();

  const renderScreen = () => {
    if (detailScreen === 'IntelligenceFeed') {
      return <IntelligenceFeedScreen onBack={() => setDetailScreen(null)} />;
    }

    switch (activeTab) {
      case 'Dashboard':
        return (
          <DashboardScreen
            onOpenIntelligenceFeed={() => setDetailScreen('IntelligenceFeed')}
            onOpenAddExpense={() => setShowAddExpense(true)}
            onViewAllTransactions={() => setActiveTab('Lens')}
          />
        );
      case 'Lens':
        return <TransactionsScreen onOpenAddExpense={() => setShowAddExpense(true)} />;
      case 'Insights':
        return (
          <InsightsScreen
            onOpenIntelligenceFeed={() => setDetailScreen('IntelligenceFeed')}
          />
        );
      case 'Vault':
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {renderScreen()}
      </View>
      {detailScreen ? null : (
        <View
          pointerEvents="box-none"
          style={[styles.bottomBarWrap, { paddingBottom: Math.max(insets.bottom, 10) }]}
        >
          <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
      )}
      <AddExpenseModal
        visible={showAddExpense}
        onClose={() => setShowAddExpense(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'visible',
  },
  screen: {
    flex: 1,
  },
  bottomBarWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 8,
    zIndex: 10000,
    elevation: 10000,
    alignItems: 'center',
  },
});

export default MainTabNavigator;
