import React, { Component } from 'react';
import { Text, Divider } from 'react-native-elements';
import FriendsList from './FriendsList';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import styles from './style';

export default class Friends extends Component {

  render() {
    return <ImageBackground source={require('../urban-pursuit-leaf-bg.jpg')} style={styles.bgImage}>
      <View style={styles.container}>
          <Text h3 style={styles.header}>
            FRIENDS
          </Text>
          <Divider />
          <FriendsList />
        </View>
      </ImageBackground>;
  }
}

