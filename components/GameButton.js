import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements';


export default class GameButton extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <View>
        <Icon
          name={this.props.iconName}
          color="black"
          reverse
          type="material-community"
          style={styles.btn}
          onPress={this.props.onPress}
        />
        <Text>{this.props.buttonName}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
})



