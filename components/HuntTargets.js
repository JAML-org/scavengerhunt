import React from 'react';
import styles from './style';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const HuntTargets = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
    <View style={styles.listContainer}>
      <Text h1>Hunt Targets</Text>
      <Text>Single tap to look at image.</Text>
      <Text> Double-tap to select target.</Text>
    </View>
    </View>
  );
};

export default HuntTargets;
