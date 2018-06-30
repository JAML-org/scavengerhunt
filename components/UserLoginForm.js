import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import styles, { colors } from './style';

export default class UserLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  updateValue(text, field) {
    if (field === 'email') {
      this.setState({
        email: text,
      });
    } else if (field === 'password') {
      this.setState({
        password: text,
      });
    }
  }

  async handleSubmit() {
    const { email, password } = this.state;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('LoggedInStack');
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={loginStyles.header}>
          <View style={loginStyles.iconBG}>
            <Icon
              xlarge
              rounded
              // reverse
              size={150}
              color={colors.lightblue}
              name="user"
              type="font-awesome"
            />
          </View>
        </View>
        <View style={loginStyles.form}>
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            onChangeText={text => this.updateValue(text, 'email')}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => this.updateValue(text, 'password')}
          />
        </View>
        <View style={loginStyles.bottom}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleSubmit()}
          >
            <Text h4 style={styles.btnText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.bottom}>
          <Text style={styles.textCenter}>
            Dont have an account?{' '}
            <Text style={styles.linkText} onPress={() => navigate('SignUp')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const loginStyles = StyleSheet.create({
  header: {
    flex: 3,
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
    flex: 2,
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
  },
});
