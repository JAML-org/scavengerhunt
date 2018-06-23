import React, { Component } from 'react';
import RegForm from './components/RegForm';
import UserLoginForm from './components/UserLoginForm';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_STORAGEBUCKET,
} from './config';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DB_URL,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
};

firebase.initializeApp(firebaseConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <RegForm /> */}
        <UserLoginForm />
      </View>
    );
  }
}
