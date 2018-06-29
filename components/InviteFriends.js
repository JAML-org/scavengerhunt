import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, List, ListItem, SearchBar } from 'react-native-elements'
import Friends from './Friends'
import * as firebase from 'firebase'

export default class InviteFriends extends Component {
  constructor() {
    super()
    this.state = {
      searchedFriend: '',
      selectedFriend: [],
      allFriends: []
    }
  }

  async componentDidMount() {
    try {
      // const userId = await firebase.auth.currentUser.uid
      const userId = "6PrgM9GxkKPqsfgm03fDlJxqLxr2"
      const allFriends = await firebase.database().ref(`/Users/${userId}/friends`).once('value').then(snap => snap.val())
      const allUsers = await firebase.database().ref(`/Users`).once('value').then(snap => snap.val())
      const friendIds = Object.keys(allFriends)
      const fullFriendsInfo = friendIds.map(friend => ({ name: allUsers[friend].name, username: allUsers[friend].username, avatar: allUsers[friend].avatar, userId: friend }))

      this.setState({ allFriends: fullFriendsInfo })
    } catch (error) { console.error(error) }
  }

  render() {
    console.log(this.state.allFriends)
    return (
      <View>
        <Friends friends={this.state.allFriends} />
      </View>
    )
  }
}
