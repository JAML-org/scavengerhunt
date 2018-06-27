import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import styles from './style';

// const styles = StyleSheet.create({
//   regform: {
//     alignSelf: 'stretch',
//   },
//   header: {
//     fontSize: 24,
//     color: '#fff',
//     paddingBottom: 10,
//     marginBottom: 40,
//     borderBottomColor: '#199187',
//     borderBottomWidth: 1,
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

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
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
    // const userId = 'H3zfrmvnhYg939HKxnAvwA6KMAB3';
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
      phone: user.phone,
      totalCompleted,
      totalWon,
    });
  }

  handleChange(text, field) {
    // console.log('TEXT', text);
    this.setState({
      [field]: text,
    });
    // console.log("UPDATED STATE1111=======", this.state[field]);
  }

  async handleSubmit() {
    const user = await firebase.auth().currentUser;
    // const userId = 'H3zfrmvnhYg939HKxnAvwA6KMAB3';
    await firebase
      .database()
      .ref(`/Users/${user.uid}`)
      .once('value')
      .then(snap => snap.val());
    await firebase
      .database()
      .ref(`/Users/${user.uid}`)
      .set({
        ...user,
        name: this.state.name,
        username: this.state.username,
        phone: this.state.phone,
      });

    if (this.state.password) {
      await user
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
    const { totalCompleted, totalWon, name, username, phone } = this.state;
    // console.log('UPDATED STATE=======', this.state.name);

    return (
      <View style={styles.container}>
        <View>
          <View>
            <Avatar xlarge rounded />
            <Text style={styles.textCenter}>Change Avatar</Text>
          </View>

          <View>
            <Text style={styles.textCenter}>{username}</Text>
            <Text style={styles.textCenter}>
              Completed Hunt: {totalCompleted}
            </Text>
            <Text style={styles.textCenter}>
              Hunts Won: {`${totalWon} / ${totalCompleted}`}
            </Text>
          </View>
        </View>

        <View>
          <View>
            <FormInput
              name="name"
              value={name}
              placeholder="Name"
              onChangeText={text => this.handleChange(text, 'name')}
            />
          </View>
          <View>
            <FormInput
              name="username"
              value={username}
              placeholder="Username"
              onChangeText={text => this.handleChange(text, 'username')}
            />
          </View>
          <View>
            <FormInput
              name="phone"
              value={phone}
              placeholder="phone"
              onChangeText={text => this.handleChange(text, 'phone')}
            />
          </View>
          <View>
            <FormInput
              name="password"
              placeholder="Enter new password"
              secureTextEntry={true}
              onChangeText={text => this.handleChange(text, 'password')}
            />
          </View>
          <Button title="Save Changes" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}
