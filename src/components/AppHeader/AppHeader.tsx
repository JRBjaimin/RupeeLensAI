import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';

type AppHeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showDivider?: boolean;
  backgroundImage?: ImageSourcePropType;
  height?: number;
};

const AppHeader = ({
  title,
  left,
  right,
  style,
  showDivider = true,
  backgroundImage,
  height,
}: AppHeaderProps) => {
  const containerStyle = [
    styles.container,
    height ? { height } : null,
    showDivider ? styles.divider : null,
    style,
  ];

  const content = (
    <View style={styles.content}>
      <View style={styles.leftGroup}>
        {left ? <View style={styles.leftIcon}>{left}</View> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {right ? <View style={styles.rightGroup}>{right}</View> : null}
    </View>
  );

  if (backgroundImage) {
    return (
      <ImageBackground source={backgroundImage} style={containerStyle} imageStyle={styles.image}>
        {content}
      </ImageBackground>
    );
  }

  return <View style={containerStyle}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading2,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default AppHeader;
