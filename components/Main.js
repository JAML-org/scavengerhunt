import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Main = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.main}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('JoinHunt')}
      >
        <Text style={styles.btntext}>Join a hunt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('HuntList')}
      >
        <Text style={styles.btntext}>Choose a hunt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('MyHuntList')}
      >
        <Text style={styles.btntext}>My Hunt list</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch'
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Main;
