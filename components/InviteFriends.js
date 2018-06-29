import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, List, ListItem, SearchBar } from 'react-native-elements'
import FriendsList from './FriendsList'
import * as firebase from 'firebase'

export default class InviteFriends extends Component {
  constructor() {
    super()
    this.state = {
      searchedFriend: '',
      selectedFriend: [],
      friends: [],
      users: [],
      filteredFriends: []
    }

    this.searchChange = this.searchChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
  }

  async componentDidMount() {
    try {
      // const userId = await firebase.auth.currentUser.uid
      const userId = "6PrgM9GxkKPqsfgm03fDlJxqLxr2"
      const allFriends = await firebase.database().ref(`/Users/${userId}/friends`).once('value').then(snap => snap.val())
      const allUsers = await firebase.database().ref(`/Users`).once('value').then(snap => snap.val())
      const friendIds = Object.keys(allFriends)
      const fullFriendsInfo = friendIds.map(friend => ({ name: allUsers[friend].name, username: allUsers[friend].username, avatar: allUsers[friend].avatar, userId: friend }))

      this.setState({ friends: fullFriendsInfo, users: allUsers, filteredFriends: fullFriendsInfo })
    } catch (error) { console.error(error) }
  }

  searchChange(searched) {
    console.log("No One Told You Life Was Gonna Be This Way CLAP CLAP CLAP CLAP =>", this.state.friends)
    const foundFriends = searched && this.state.friends.filter(friend => friend.name.toLowerCase().includes(searched.toLowerCase()))
    this.setState({ searchedFriend: searched, filteredFriends: foundFriends || this.state.friends })
  }

  clearSearch() {
    this.setState({ filteredFriends: [...this.state.friends], searchedFriend: '' })
  }

  render() {
    console.log("searched friend =====>", this.state.filteredFriends)
    return (
      <View>
        <Text h4>Invite Friends to Play</Text>
        <Divider />
        <FriendsList search={this.searchChange} friends={this.state.filteredFriends} clearSearch={this.clearSearch} searchedFriend={this.state.searchedFriend} />
      </View>
    )
  }
}
