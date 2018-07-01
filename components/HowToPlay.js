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
      <View style={styles.container}>
        <Text style={styles.header}>How To Play</Text>
      </View>
    );
  }
}
