import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import styles from './style';

export default class HowToPlay extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <Text style={styles.header}>How To Play</Text>
        </View>
      </ImageBackground>
    );
  }
}
