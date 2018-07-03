import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Icon, Divider } from 'react-native-elements'
import styles from './style';

const dummyData = [
  { id: 1, icon: "palette", name: "Museum" },
  { id: 2, icon: "food-variant", name: "Famous Eats" },
  { id: 3, icon: "ios-microphone-outline", name: "Music" },
]

export default class MyHuntList extends Component {
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
          <Text style={styles.header}>My Hunt List</Text>
          <Divider />
          {
            dummyData.map(dummy => {
              return (
                <View key={dummy.id}>
                  <Icon name={dummy.icon}
                    color="black"
                    reverse
                    type="material-community"
                    style={styles.btn}
                  />
                </View>
              )
            }
            )
          }
        </View>
      </ImageBackground>
    );
  }
}

const styling = StyleSheet.create({
  buttonList: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  btn: {
    borderRadius: 20,
  }
});
