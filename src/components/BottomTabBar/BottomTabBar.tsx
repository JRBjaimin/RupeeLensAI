import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme';

export type TabKey = 'Dashboard' | 'Lens' | 'Insights' | 'Vault';

type Props = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

const BottomTabBar = ({ activeTab, onTabPress }: Props) => {
  const activeLabel =
    activeTab === 'Dashboard'
      ? 'DASHBOARD'
      : activeTab === 'Lens'
        ? 'LENS'
        : activeTab === 'Insights'
          ? 'INSIGHTS'
          : 'VAULT';

  return (
    <View style={styles.shell}>
      <TabItem
        tab="Dashboard"
        activeTab={activeTab}
        onPress={onTabPress}
        label={activeLabel}
        renderIcon={(color) => <DashboardIcon color={color} />}
      />
      <TabItem
        tab="Lens"
        activeTab={activeTab}
        onPress={onTabPress}
        label={activeLabel}
        renderIcon={(color) => <LensIcon color={color} />}
      />
      <TabItem
        tab="Insights"
        activeTab={activeTab}
        onPress={onTabPress}
        label={activeLabel}
        renderIcon={(color) => <InsightsIcon color={color} />}
      />
      <TabItem
        tab="Vault"
        activeTab={activeTab}
        onPress={onTabPress}
        label={activeLabel}
        renderIcon={(color) => <VaultIcon color={color} />}
      />
    </View>
  );
};

type TabItemProps = {
  tab: TabKey;
  activeTab: TabKey;
  onPress: (tab: TabKey) => void;
  label: string;
  renderIcon: (color: string) => React.ReactNode;
};

const TabItem = ({
  tab,
  activeTab,
  onPress,
  label,
  renderIcon,
}: TabItemProps) => {
  const isActive = tab === activeTab;
  const color = isActive ? colors.textPrimary : '#A7AABA';
  return (
    <Pressable
      onPress={() => onPress(tab)}
      style={isActive ? styles.activePill : styles.iconWrap}
    >
      {renderIcon(color)}
      {isActive ? <Text style={styles.activeText}>{label}</Text> : null}
    </Pressable>
  );
};

const DashboardIcon = ({ color = '#A7AABA' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 18 18" fill="none">
    <Path
      d="M0 8V0H8V8H0V8M0 18V10H8V18H0V18M10 8V0H18V8H10V8M10 18V10H18V18H10V18M2 6H6V2H2V6V6M12 6H16V2H12V6V6M12 16H16V12H12V16V16M2 16H6V12H2V16V16M12 6V6V6V6V6V6M12 12V12V12V12V12V12M6 12V12V12V12V12V12M6 6V6V6V6V6V6"
      fill={color}
    />
  </Svg>
);

const LensIcon = ({ color = '#A7AABA' }: { color?: string }) => (
  <Svg width={22} height={17} viewBox="0 0 22 15" fill="none">
    <Path
      d="M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12V12M11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2V10.2M11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15V15M11 7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5M11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13V13"
      fill={color}
    />
  </Svg>
);

const InsightsIcon = ({ color = '#A7AABA' }: { color?: string }) => (
  <Svg width={22} height={17} viewBox="0 0 22 17" fill="none">
    <Path
      d="M2 17C1.45 17 0.979167 16.8042 0.5875 16.4125C0.195833 16.0208 0 15.55 0 15C0 14.45 0.195833 13.9792 0.5875 13.5875C0.979167 13.1958 1.45 13 2 13C2.1 13 2.1875 13 2.2625 13C2.3375 13 2.41667 13.0167 2.5 13.05L7.05 8.5C7.01667 8.41667 7 8.3375 7 8.2625C7 8.1875 7 8.1 7 8C7 7.45 7.19583 6.97917 7.5875 6.5875C7.97917 6.19583 8.45 6 9 6C9.55 6 10.0208 6.19583 10.4125 6.5875C10.8042 6.97917 11 7.45 11 8C11 8.03333 10.9833 8.2 10.95 8.5L13.5 11.05C13.5833 11.0167 13.6625 11 13.7375 11C13.8125 11 13.9 11 14 11C14.1 11 14.1875 11 14.2625 11C14.3375 11 14.4167 11.0167 14.5 11.05L18.05 7.5C18.0167 7.41667 18 7.3375 18 7.2625C18 7.1875 18 7.1 18 7C18 6.45 18.1958 5.97917 18.5875 5.5875C18.9792 5.19583 19.45 5 20 5C20.55 5 21.0208 5.19583 21.4125 5.5875C21.8042 5.97917 22 6.45 22 7C22 7.55 21.8042 8.02083 21.4125 8.4125C21.0208 8.80417 20.55 9 20 9C19.9 9 19.8125 9 19.7375 9C19.6625 9 19.5833 8.98333 19.5 8.95L15.95 12.5C15.9833 12.5833 16 12.6625 16 12.7375C16 12.8125 16 12.9 16 13C16 13.55 15.8042 14.0208 15.4125 14.4125C15.0208 14.8042 14.55 15 14 15C13.45 15 12.9792 14.8042 12.5875 14.4125C12.1958 14.0208 12 13.55 12 13C12 12.9 12 12.8125 12 12.7375C12 12.6625 12.0167 12.5833 12.05 12.5L9.5 9.95C9.41667 9.98333 9.3375 10 9.2625 10C9.1875 10 9.1 10 9 10C8.96667 10 8.8 9.98333 8.5 9.95L3.95 14.5C3.98333 14.5833 4 14.6625 4 14.7375C4 14.8125 4 14.9 4 15C4 15.55 3.80417 16.0208 3.4125 16.4125C3.02083 16.8042 2.55 17 2 17V17M3 6.975L2.375 5.625L1.025 5L2.375 4.375L3 3.025L3.625 4.375L4.975 5L3.625 5.625L3 6.975V6.975M14 6L13.05 3.95L11 3L13.05 2.05L14 0L14.95 2.05L17 3L14.95 3.95L14 6V6"
      fill={color}
    />
  </Svg>
);

const VaultIcon = ({ color = '#A7AABA' }: { color?: string }) => (
  <Svg width={16} height={21} viewBox="0 0 16 21" fill="none">
    <Path
      d="M2 21C1.45 21 0.979167 20.8042 0.5875 20.4125C0.195833 20.0208 0 19.55 0 19V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H3V5C3 3.61667 3.4875 2.4375 4.4625 1.4625C5.4375 0.4875 6.61667 0 8 0C9.38333 0 10.5625 0.4875 11.5375 1.4625C12.5125 2.4375 13 3.61667 13 5V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V19C16 19.55 15.8042 20.0208 15.4125 20.4125C15.0208 20.8042 14.55 21 14 21H2V21M8 16C8.55 16 9.02083 15.8042 9.4125 15.4125C9.80417 15.0208 10 14.55 10 14C10 13.45 9.80417 12.9792 9.4125 12.5875C9.02083 12.1958 8.55 12 8 12C7.45 12 6.97917 12.1958 6.5875 12.5875C6.19583 12.9792 6 13.45 6 14C6 14.55 6.19583 15.0208 6.5875 15.4125C6.97917 15.8042 7.45 16 8 16V16M5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7V7"
      fill={color}
    />
  </Svg>
);

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    height: 68,
    borderRadius: 999,
    backgroundColor: 'rgba(16,22,36,0.98)',
    borderColor: 'rgba(120,128,160,0.3)',
    borderWidth: 1,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6c5ce7',
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 16,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 22,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(46,52,78,0.8)',
    borderWidth: 1.5,
    borderColor: 'rgba(172,163,255,0.7)',
    shadowColor: '#8D84FF',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  activePillIdle: {
    opacity: 0.75,
  },
  activeText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

export default BottomTabBar;
