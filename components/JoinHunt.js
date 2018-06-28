import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Divider, List, Button, ListItem, TouchableHighlight } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from './style';

export default class JoinHunt extends Component {
  constructor() {
    super();
    this.state = {
      invites: {},
      selected: ""
    }
    this.toggleSelected = this.toggleSelected.bind(this)
    this.deleteInvite = this.deleteInvite.bind(this)
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
  }

  toggleSelected(invite) {
    this.state.selected === invite ? this.setState({ selected: "" }) : this.setState({ selected: invite })
  }

  async deleteInvite(invite) {
    const userId = await firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref(`/Users/${userId}/invites`)
      .child(invite)
      .remove()
  }

  render() {
    const { invites, selected } = this.state;
    // if (!invites) {
    //   return (<Text>Sorry no Invites</Text>)
    // }
    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: '25%' }}>
          <Text h4 style={{ color: 'white' }}>
            Invites
          </Text>
          <Divider />
        </View>
        <View>
          {invites ?
            <List>
              {Object.keys(invites).map(invite => (
                <ListItem
                  key={invite}
                  roundAvatar
                  title={invites[invite].theme}
                  subtitle={`from ${invites[invite].from.name}`}
                  avatar={{ uri: invites[invite].from.avatar }}
                  containerStyle={
                    selected === invite
                      ? styling.active
                      : styling.inactive}
                  onPress={() => this.toggleSelected(invite)}
                />
              ))}
            </List>
            : (<Text h4 style={{ color: 'white' }}>Sorry no Invites</Text>)
          }
        </View>
        <View style={styling.buttonList}>
          <View>
            <Button
              title="ACCEPT"
              buttonStyle={styling.btn}
              onPress={() => this.props.navigation.navigate('Map', selected)}
            />
          </View>
          <View>
            <Button
              title="DECLINE"
              buttonStyle={styling.btn}
              onPress={() => this.deleteInvite(selected)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styling = StyleSheet.create({
  buttonList: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  btn: {
    borderRadius: 20,
  },
  active: {
    backgroundColor: "orange"
  },
  inactive: {
    backgroundColor: "white"
  },
})
