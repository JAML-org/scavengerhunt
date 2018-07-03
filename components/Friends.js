import React, { Component } from 'react';
import { Text, Divider } from 'react-native-elements';
import FriendsList from './FriendsList';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import stylesFromJs from './style';

export default class Friends extends Component {

  render() {
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={stylesFromJs.bgImage}
      >
        <View style={styles.container}>
          <Text h4>Friends</Text>
          <Divider />
          <FriendsList />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
})
