import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

const Main = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.btn} onPress={() => navigate('JoinHunt')}>
        <Text style={styles.btnText}>Join a hunt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigate('HuntList')}>
        <Text style={styles.btnText}>Choose a hunt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate('MyHuntList')}
      >
        <Text style={styles.btnText}>My Hunt list</Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   main: {
//     alignSelf: 'stretch',
//   },
//   textinput: {
//     alignSelf: 'stretch',
//     height: 40,
//     marginBottom: 30,
//     color: 'black',
//     borderBottomColor: '#f8f8f8',
//     borderBottomWidth: 1,
//   },
//   button: {
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#59cbbd',
//     marginTop: 30,
//   },
//   btntext: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

export default Main;
