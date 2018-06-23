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

const RootStack = createStackNavigator(
  {
    UserLogin: {
      screen: UserLoginForm,
    },
    RegForm: {
      screen: RegForm,
    },
    HuntList: {
      screen: HuntList,
    },
    HuntDetails: {
      screen: HuntDetails,
    },
  },
  {
    initialRouteName: 'UserLogin',
  }
);

const App = () => <RootStack />;

export default App;
