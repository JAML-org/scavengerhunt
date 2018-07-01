import React, { Component } from 'react';
import { Text, Divider } from 'react-native-elements';
import FriendsList from './FriendsList';
import { StyleSheet, View, ImageBackground } from 'react-native';
import styles from './style';

export default class Friends extends Component {
  constructor() {
    super();
    this.state = {
      searchedFriend: '',
      selectedFriend: [],
    };
  }

  render() {
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <Text h4>Add Friends</Text>
          <Divider />
          <FriendsList />
        </View>
      </ImageBackground>
    );
  }
}
