import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, List, ListItem, SearchBar } from 'react-native-elements'
import FriendsList from './FriendsList'
import * as firebase from 'firebase'


export default class Friends extends Component {
  constructor() {
    super()
    this.state = {
      searchedFriend: '',
      selectedFriend: [],
    }
  }

  // async componentDidMount() {
  //   try {


  //   } catch (error) { console.error(error) }
  // }


  render() {
    return (
      <View>
        <Text h4>Add Friends</Text>
        <Divider />
        <FriendsList />
      </View>
    )
  }
}
