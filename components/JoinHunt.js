import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Divider, List, ListItem, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from './style';

export default class JoinHunt extends Component {
  constructor() {
    super();
    this.state = {
      invites: {},
    };
  }

  async componentDidMount() {
    const userId = await firebase.auth().currentUser.uid;
    const user = await firebase
      .database()
      .ref(`/Users/${userId}`)
      .once('value')
      .then(snap => snap.val());

    this.setState({
      invites: user.invites,
    });
    // console.log('INVITES', invites);
  }

  render() {
    const { invites } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: '25%' }}>
          <Text h4 style={{ color: 'white' }}>
            Invites
          </Text>
          <Divider />
        </View>
        <View>
          <List>
            {Object.keys(invites).map(invite => (
              <ListItem
                key={invite}
                roundAvatar
                title={invites[invite].theme}
                subtitle={`from ${invites[invite].from.name}`}
                avatar={{ uri: invites[invite].from.avatar }}
              />
            ))}
          </List>
        </View>
      </View>
    );
  }
}
