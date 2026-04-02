import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../screens/intelligenceFeed/styles';

type FeedCardProps = {
  tag: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const FeedCard = ({ tag, title, body, icon }: FeedCardProps) => (
  <View style={styles.feedCard}>
    <View style={styles.feedHeader}>
      <View style={styles.feedIcon}>{icon}</View>
      <Text style={styles.feedTag}>{tag}</Text>
    </View>
    <Text style={styles.feedTitle}>{title}</Text>
    <Text style={styles.feedBody}>{body}</Text>
  </View>
);

export default FeedCard;
