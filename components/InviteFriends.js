import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, Button } from 'react-native-elements'
import FriendsList from './FriendsList'
import * as firebase from 'firebase'

export default class InviteFriends extends Component {
  constructor() {
    super()
    this.state = {
      searchedFriend: '',
      selectedFriends: [],
      friends: [],
      filteredFriends: [],
    }

    this.searchChange = this.searchChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.selectFriends = this.selectFriends.bind(this)
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

  selectFriends(friend) {
    const deselect = this.state.selectedFriends.filter(selected => selected !== friend)
    this.state.selectedFriends.includes(friend) ?
      this.setState({ selectedFriends: deselect }) :
      this.setState({ selectedFriends: [...this.state.selectedFriends, friend] })
  }

  inviteFriends() {
    //add invites to other users in firebase
    // this.props.navigation.navigate('Map')
  }
  render() {
    const { navigate } = this.props.navigation
    console.log("Selected Frien =========>", this.state.selectedFriends)
    return (
      <View>
        <View>
          <Text h4>Invite Friends to Play</Text>
          <Divider />
          <View>
            <Button
              title="START PURSUIT"
              onPress={() => navigate('Map')}
              buttonStyle={styling.btn}
            />
          </View>
          <View>
            <FriendsList search={this.searchChange} friends={this.state.filteredFriends} clearSearch={this.clearSearch} searchedFriend={this.state.searchedFriend} select={this.selectFriends} />
          </View>
        </View>
        <View>
          <Button
            title="INVITE FRIENDS"
            buttonStyle={styling.inviteBtn}
          // onPress={() => inviteFriends()}
          />
        </View>
      </View>
    )
  }
}

const styling = StyleSheet.create({
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
  active: {
    backgroundColor: "orange"
  },
  inactive: {
    backgroundColor: "white"
  },
})
