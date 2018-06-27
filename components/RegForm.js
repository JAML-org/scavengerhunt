import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_STORAGEBUCKET,
} from '../config';

import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class RegForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      phone: '',
      username: '',
    };
  }

  updateValue(text, field) {
    this.setState({
      [field]: text,
    });
  }

  async handleSubmit() {
    const { email, password, username, phone, name } = this.state;
    const snap = await firebase
      .database()
      .ref('/Users')
      .once('value');
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase
        .database()
        .ref('/Users')
        .set({
          ...snap.val(),
          [firebase.auth().currentUser.uid]: {
            username,
            phone,
            name,
            email,
          },
        });
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  }

  static navigationOptions = {
    drawerLabel: 'Menu',
    drawerIcon: <Icon name="menu" />,
  };

  render() {
    return (
      <View style={styles.regform}>
        <Text style={styles.header}>Registration</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Name"
          onChangeText={text => this.updateValue(text, 'name')}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Username"
          onChangeText={text => this.updateValue(text, 'username')}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Email"
          onChangeText={text => this.updateValue(text, 'email')}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Phone number"
          onChangeText={text => this.updateValue(text, 'phone')}
        />

        <TextInput
          style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.updateValue(text, 'password')}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleSubmit()}
        >
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
