import React from 'react';
import styles, { colors } from './style';
import {
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Icon, Text, Avatar } from 'react-native-elements';
import * as firebase from 'firebase';

const Win = props => {
  const { navigate, getParam } = props.navigation;

  // const player = getParam('player');
  const player = {
    name: 'Angel',
    username: 'Enju',
    avatar:
      'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/46.png https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/46.png',
  };
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
          size={80}
        />
        <Avatar xlarge rounded source={{ uri: player.avatar }} />
        <Text h3>Winner is</Text>
        <Text h1 style={styles.header}>
          {player.name}
        </Text>
        <Text>({player.username})</Text>
        <TouchableOpacity
          style={[styles.btn, mainStyling.row]}
          onPress={() => navigate('PursuitList')}
        >
          <Text style={styles.btnText}>PLAY AGAIN</Text>
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
