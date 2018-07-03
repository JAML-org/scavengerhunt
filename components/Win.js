import React from 'react';
import styles, { colors } from './style';
import { View, ImageBackground, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import * as firebase from 'firebase';

const Win = props => {
  const { navigate, getParam } = props.navigation;
  // const playerId = '0Uu98KnCIrUNCqJUdn0Fl8ZegYS2';
  const player = getParam('player');
  console.log(player);
  return (
    <ImageBackground
      source={require('../urban-pursuit-leaf-bg.jpg')}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <Icon
          name="crown"
          type="foundation"
          color={colors.mediumblue}
          size={150}
        />
        <Text h3>Winner is</Text>
        <Text h1 style={styles.header}>
          {player.name}
        </Text>
        <Text>({player.username})</Text>
        <TouchableOpacity
          style={[styles.btn, mainStyling.row]}
          onPress={() => navigate('PursuitList')}
        ><Text style={styles.btnText}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const mainStyling = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  row: {
    marginVertical: 10,
  },
});

export default Win;
