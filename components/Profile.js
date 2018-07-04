import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, TextInput, ImageBackground } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements';
import styles, { colors } from './style';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      avatar: '',
      phone: '',
      password: '',
      totalCompleted: 0,
      totalWon: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const userId = await firebase.auth().currentUser.uid;
    const user = await firebase
      .database()
      .ref('/Users')
      .once('value')
      .then(snap => snap.val()[userId]);

    const games = user.Games;
    let totalCompleted = 0;
    let totalWon = 0;
    if (games) {
      Object.keys(games).forEach(gameId => {
        if (games[gameId].length) {
          totalCompleted++;
          if (games[gameId] === userId) totalWon++;
        }
      });
    }

    this.setState({
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      phone: user.phone,
      totalCompleted,
      totalWon,
    });
  }

  handleChange(text, field) {
    this.setState({
      [field]: text,
    });
  }

  async handleSubmit() {
    const userAuth = await firebase.auth().currentUser;
    const user = await firebase
      .database()
      .ref(`/Users/${userAuth.uid}`)
      .once('value')
      .then(snap => snap.val());

    await firebase
      .database()
      .ref(`/Users/${userAuth.uid}`)
      .set({
        ...user,
        name: this.state.name,
        username: this.state.username,
        phone: this.state.phone,
      });

    if (this.state.password) {
      await userAuth
        .updatePassword(this.state.password)
        .then(() => console.log('Password updated'))
        .catch(err => console.error(err));
      this.setState({
        password: '',
      });
    }
    alert('Profile Updated');
  }

  render() {
    const {
      totalCompleted,
      totalWon,
      name,
      username,
      avatar,
      phone,
    } = this.state;
    if (!avatar) {
      return 'Loading...';
    }
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={profileStyling.userInfo}>
            <View style={profileStyling.col2}>
              <Avatar xlarge rounded source={{ uri: avatar }} />
              <Text
                style={[
                  styles.linkText,
                  styles.textCenter,
                  profileStyling.link,
                ]}
              >CHANGE AVATAR
              </Text>
            </View>

            <View style={profileStyling.col2}>
              <Text h4 style={[styles.textCenter, profileStyling.username]}>
                {username}
              </Text>
              <Text style={styles.textCenter}>
                Completed Hunt: {totalCompleted}
              </Text>
              <Text style={styles.textCenter}>
                Hunts Won: {`${totalWon} / ${totalCompleted}`}
              </Text>
            </View>
          </View>

          <View style={profileStyling.form}>
            <TextInput
              style={styles.textinput}
              name="name"
              value={name}
              placeholder="Name"
              onChangeText={text => this.handleChange(text, 'name')}
            />
            <TextInput
              style={styles.textinput}
              name="username"
              value={username}
              placeholder="Username"
              onChangeText={text => this.handleChange(text, 'username')}
            />
            <TextInput
              style={styles.textinput}
              name="phone"
              value={phone}
              placeholder="phone"
              onChangeText={text => this.handleChange(text, 'phone')}
            />
            <TextInput
              style={styles.textinput}
              name="password"
              placeholder="Enter new password"
              secureTextEntry={true}
              onChangeText={text => this.handleChange(text, 'password')}
            />
          </View>
          <View style={profileStyling.save}>
            <Button
              buttonStyle={styles.btn}
              title="Save Changes"
              onPress={() => this.handleSubmit()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const profileStyling = StyleSheet.create({
  userInfo: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  col2: {
    width: '40%',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  username: {
    color: colors.pink,
    flexWrap: 'wrap',
    fontFamily: 'Kohinoor Bangla',
  },
  link: {
    marginTop: 10,
  },
  form: {
    flex: 2,
  },
  save: {
    flex: 1,
  },
});
