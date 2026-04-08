import React from 'react';
import { Image, Text, View, Pressable } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import { styles } from '../../screens/transactions/styles';

export type TransactionCardProps = {
  title: string;
  subtitle: string;
  meta: string;
  amount: string;
  time: string;
  badge?: string;
  accent: string;
  icon?: React.ReactNode;
  iconImage?: number;
  amountPositive?: boolean;
  useLinearIconBg?: boolean;
  linearColors?: [string, string];
  onLongPress?: () => void;
};

const TransactionCard = ({
  title,
  subtitle,
  meta,
  amount,
  time,
  badge,
  accent,
  icon,
  iconImage,
  amountPositive,
  useLinearIconBg,
  linearColors,
  onLongPress,
}: TransactionCardProps) => (
  <Pressable onLongPress={onLongPress} style={[styles.txnCard, { borderColor: `${accent}55`, shadowColor: accent }]}> 
    <View style={[styles.iconBubble, iconImage ? styles.iconBubbleImage : undefined]}>
      {iconImage ? (
        <Image source={iconImage} style={styles.iconImage} />
      ) : (
        <>
          {useLinearIconBg ? (
            <LinearGradientCircle accent={accent} colors={linearColors} />
          ) : (
            <GradientCircle accent={accent} />
          )}
          {icon}
        </>
      )}
    </View>
    <View style={styles.txnBody}>
      <Text style={styles.txnTitle}>{title}</Text>
      <View style={styles.txnMetaRow}>
        {badge ? (
          <View style={[styles.badge, { borderColor: `${accent}88`, backgroundColor: `${accent}22` }]}> 
            <Text style={[styles.badgeText, { color: accent }]}>{badge}</Text>
          </View>
        ) : null}
        <Text style={styles.txnMeta}>{subtitle}</Text>
        {meta ? <Text style={styles.txnMeta}>{meta}</Text> : null}
      </View>
    </View>
    <View style={styles.txnRight}>
      <Text style={[styles.txnAmount, amountPositive && styles.txnAmountPositive]}>
        {amount}
      </Text>
      <Text style={styles.txnTime}>{time}</Text>
    </View>
  </Pressable>
);

const GradientCircle = ({ accent }: { accent: string }) => {
  const glow = hexToRgba(accent, 0.55);
  const mid = hexToRgba(accent, 0.28);
  const fade = hexToRgba(accent, 0.08);
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" style={styles.gradientCircle}>
      <Defs>
        <RadialGradient id="grad" cx="50%" cy="45%" r="60%">
          <Stop offset="0%" stopColor={glow} />
          <Stop offset="60%" stopColor={mid} />
          <Stop offset="100%" stopColor={fade} />
        </RadialGradient>
      </Defs>
      <Circle cx="20" cy="20" r="20" fill="url(#grad)" />
    </Svg>
  );
};

const LinearGradientCircle = ({
  accent,
  colors,
}: {
  accent: string;
  colors?: [string, string];
}) => (
  <Svg width={54} height={54} viewBox="0 0 54 54" style={styles.gradientCircle}>
    <Defs>
      <LinearGradient id="base" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={colors?.[0] ?? '#202535'} stopOpacity="1" />
        <Stop offset="45%" stopColor="#0B0F1A" stopOpacity="1" />
        <Stop offset="100%" stopColor={colors?.[1] ?? accent} stopOpacity="1" />
      </LinearGradient>
      <LinearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={accent} stopOpacity="1" />
        <Stop offset="50%" stopColor={accent} stopOpacity="0" />
        <Stop offset="100%" stopColor={accent} stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Circle cx="27" cy="27" r="27" fill="url(#base)" />
    <Circle cx="27" cy="27" r="27" fill="url(#linear)" />
  </Svg>
);

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace('#', '');
  const isShort = clean.length === 3;
  const value = isShort
    ? clean
        .split('')
        .map((c) => c + c)
        .join('')
    : clean;
  const num = parseInt(value, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default TransactionCard;
