import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import * as firebase from 'firebase';

import styles, { colors } from './style';

export default class SignUpForm extends Component {
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
            avatar: "https://vistana-web-static.s3.amazonaws.com/vistana-web/assets/img/profile/production/profile-pic-thumb.png",
            phone,
            name,
            email,
            friends: ["initiate"]
          },
        })
        .then(this.props.navigation.navigate('LoggedInStack'));
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
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={signUpStyles.header}>
            <View style={signUpStyles.iconBG}>
              <Icon
                xlarge
                rounded
                // reverse
                size={100}
                color={colors.lightblue}
                name="user-plus"
                type="font-awesome"
              />
            </View>
          </View>
          <View style={signUpStyles.form}>
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
          </View>
          <View style={signUpStyles.bottom}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.handleSubmit()}
            >
              <Text h4 style={styles.btnText}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={signUpStyles.bottom}>
            <Text style={styles.textCenter}>
              Already have an account?{' '}
              <Text
                style={styles.linkText}
                onPress={() => navigate('UserLogin')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const signUpStyles = StyleSheet.create({
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBG: {
    backgroundColor: colors.white,
    borderRadius: 100,
    height: 200,
    width: 200,
    justifyContent: 'center',
  },
  form: {
    flex: 3,
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
});
