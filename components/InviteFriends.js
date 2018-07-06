import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Divider, Button } from 'react-native-elements';
import FriendsList from './FriendsList';
import * as firebase from 'firebase';
import styles, { colors } from './style';

export default class InviteFriends extends Component {
  constructor() {
    super();
    this.state = {
      searchedFriend: '',
      selectedFriends: [],
      friends: [],
      filteredFriends: [],
      userId: '',
    };

    this.searchChange = this.searchChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.selectFriends = this.selectFriends.bind(this);
    this.inviteFriends = this.inviteFriends.bind(this);
  }

  async componentDidMount() {
    try {
      const userId = this.props.currentPlayer;
      // const userId = '6PrgM9GxkKPqsfgm03fDlJxqLxr2';
      if (userId) {
        const allFriends = await firebase
          .database()
          .ref(`/Users/${userId}/friends`)
          .once('value')
          .then(snap => snap.val());
        const allUsers = await firebase
          .database()
          .ref(`/Users`)
          .once('value')
          .then(snap => snap.val());
        const fullFriendsInfo = allFriends.map(friend => ({
          name: allUsers[friend].name,
          username: allUsers[friend].username,
          avatar: allUsers[friend].avatar,
          userId: friend,
        }));
        this.setState({
          gameId: 'd',
          friends: fullFriendsInfo,
          filteredFriends: fullFriendsInfo,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // static async getDerivedStateFromProps(props, state) {
  //   if (props.currentPlayer && props.currentPlayer !== state.userId) {
  //     const userId = this.props.currentPlayer;
  //     // const userId = '6PrgM9GxkKPqsfgm03fDlJxqLxr2';
  //     const allFriends = await firebase
  //       .database()
  //       .ref(`/Users/${userId}/friends`)
  //       .once('value')
  //       .then(snap => snap.val());
  //     const allUsers = await firebase
  //       .database()
  //       .ref(`/Users`)
  //       .once('value')
  //       .then(snap => snap.val());
  //     const fullFriendsInfo = allFriends.map(friend => ({
  //       name: allUsers[friend].name,
  //       username: allUsers[friend].username,
  //       avatar: allUsers[friend].avatar,
  //       userId: friend,
  //     }));

  //     return {
  //       userId: userId,
  //       friends: fullFriendsInfo,
  //       filteredFriends: fullFriendsInfo,
  //     };
  //   }
  //   return state;
  // }

  searchChange(searched) {
    console.log(
      'No One Told You Life Was Gonna Be This Way CLAP CLAP CLAP CLAP =>',
      this.state.friends
    );
    const foundFriends =
      searched &&
      this.state.friends.filter(friend =>
        friend.name.toLowerCase().includes(searched.toLowerCase())
      );
    this.setState({
      searchedFriend: searched,
      filteredFriends: foundFriends || this.state.friends,
    });
  }

  clearSearch() {
    this.setState({
      filteredFriends: [...this.state.friends],
      searchedFriend: '',
    });
  }

  selectFriends(friend) {
    const deselect = this.state.selectedFriends.filter(
      selected => selected !== friend
    );
    this.state.selectedFriends.includes(friend)
      ? this.setState({ selectedFriends: deselect })
      : this.setState({
          selectedFriends: [...this.state.selectedFriends, friend],
        });
  }

  async inviteFriends() {
    //add invites to other users in firebase
    // this.props.navigation.navigate('Map')
    if (this.state.selectedFriends.length) {
      // const { newGameId, huntLocations } = this.props;
      const newGameId = 'd';
      const huntLocations = [1, 2, 3, 4, 5];
      const targetLocations = {};
      huntLocations.forEach(loc => (targetLocations[loc] = false));
      const players = await firebase
        .database()
        .ref(`/Games/${this.state.gameId}/players`);
      this.state.selectedFriends.forEach(async friendId => {
        const prev = await players.once('value');
        const friend = await firebase
          .database()
          .ref(`/Users/${friendId}/Games`);
        await players.set({
          ...prev.val(),
          [friendId]: targetLocations,
        });
        const friendGames = await friend.once('value').then(snap => snap.val());
        await friend.set({
          ...friendGames,
          [newGameId]: '',
        });
      });
    }
  }
  render() {
    const { navigate, getParams } = this.props.navigation;
    const huntLocations = getParams('huntLocations');
    const huntName = getParams('huntName');
    const newGameId = getParams('newGameId');
    const currentPlayer = getParams('huntLocations');

    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        {/* <View style={styling.flex1}>
          <Text h4 style={styles.header}>
            Invite Friends to Play
          </Text>
          <Divider />
          <View style={styling.top}>
            <Button
              title="START PURSUIT"
              onPress={() => navigate('Map')}
              buttonStyle={styles.btn}
            />
          </View>
          <View style={styling.friendsList}>
            <FriendsList
              search={this.searchChange}
              friends={this.state.filteredFriends}
              clearSearch={this.clearSearch}
              searchedFriend={this.state.searchedFriend}
              select={this.selectFriends}
            />
          </View>
          <View style={styling.bottom}>
            <Button
              title="INVITE FRIENDS"
              buttonStyle={styles.btn}
              onPress={() => this.inviteFriends()}
            />
          </View>
        </View> */}
        <View style={styles.container}>
          <Text h4 style={styles.header}>
            Invite Friends to Play
          </Text>
          <Divider />
          <View style={styling.top}>
            <Button
              title="START PURSUIT"
              onPress={() =>
                navigate('Map', {
                  huntLocations: huntLocations,
                  huntName,
                  newGameId: newGameId,
                  currentPlayer,
                })
              }
              buttonStyle={styles.btn}
            />
          </View>
          <View style={styling.friendsList}>
            <FriendsList />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styling = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  top: {
    flex: 1,
    marginTop: 10,
  },
  friendsList: {
    flex: 3,
  },
  bottom: {
    flex: 1,
  },
  inviteBtn: {
    position: 'absolute',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    borderRadius: 20,
  },
  btn: {
    borderRadius: 20,
  },
});
