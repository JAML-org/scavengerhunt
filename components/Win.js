import React from 'react';
import styles from './style';
import { View, ImageBackground } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const Win = props => {
  const {playerId} = props
  console.log(playerId)
  return (
    <ImageBackground
      source={require('../urban-pursuit-leaf-bg.jpg')}
      style={styles.bgImage}
    >
      <View style={styles.container}>
      <Text>WE ARE HERE!</Text>

      </View>
    </ImageBackground>
  );
};

export default Win;
