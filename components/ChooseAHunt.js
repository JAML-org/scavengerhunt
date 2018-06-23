import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Avatar } from 'react-native-material-ui';
import {styles} from '../App';
export default class ChooseAHunt extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        <Text>Choose A Hunt</Text>
        <View style={styles.list}>
          <Avatar size={80} text="Theme" />
          <Avatar size={80} text="Theme" />
          <Avatar size={80} text="Theme" />
          <Avatar size={80} text="hunts" />
          <Avatar size={80} text="Testing" />
          <Avatar size={80} text="Hello" />
        </View>
      </View>
    );
  }
}
