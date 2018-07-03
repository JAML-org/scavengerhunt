import React, { Component } from 'react';
import AddedFriends from './AddedFriends'
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Divider,
  SearchBar,
} from 'react-native-elements';
import * as firebase from 'firebase';

export default class FriendsList extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    }
    this.search = this.search.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Setting the local state for 'user' to be the email of the person that the user wants to add
  search(user) {
    this.setState({ user });
  }

  //addFriend with add the friend's email to the current user's friend's array in firebase
  async addFriend() {
    const { user } = this.state;
    try {
      const currentUserId = await firebase.auth().currentUser.uid;
      const currentUserFriendsLink = await firebase.database().ref(`/Users/${currentUserId}/`);
      const currentUserFriendsMetaData = await firebase.database().ref(`/Users/${currentUserId}/friends`).once('value');
      const currentUserFriends = await currentUserFriendsMetaData.val();

      //Creating the new friends arr with the new friend's email(user from local state)
      let newFriendsArr = [...currentUserFriends, user];
  
      //If the current user doesnt have any friends, set the newFriendsArr to be the user's email 
      currentUserFriends[0] === 'initiate' ? newFriendsArr = [user]: null
  
      //Updating firebase to include the new friend
      currentUserFriendsLink.update({ friends: newFriendsArr });
    } catch(err) {
      console.error(err);
    }
  }

  async handleSubmit() {
    const { user } = this.state;

    try{
      //Getting the friends array for current user from firebase
      const currentUserId = await firebase.auth().currentUser.uid
      const currentUserFriendsMetaData = await firebase.database().ref(`/Users/${currentUserId}/friends`).once('value')
      const currentUserFriends = await currentUserFriendsMetaData.val()
  
      //Getting all Users from firebase
      const getUsers = await firebase.database().ref('/Users').once('value')
      const users = await getUsers.val();
      const allUserId = Object.keys(users);
  
      //Checking if the friend's email exist in firebase
      let doesUserExist = false
      allUserId.forEach(userId => {
        users[userId].email === user ? doesUserExist = true : null
      })
  
      if(doesUserExist) {
        
        if(currentUserFriends.indexOf(user) > -1) {
          alert(`You are already friends with ${user}!`)
        } else {
          this.addFriend() 
        }
      } else {
        alert('Sorry, user does not exist!')
      }

    } catch(err) {
      console.error(err);
    }
  }
  
  render() {
    const { search, clearSearch, searchedFriend, select } = this.props;
   
    return (
    <View style={styles.container2}>
      <View>
        <SearchBar
          lightTheme
          clearIcon={true}
          onChangeText={user => this.search(user)}
          onClear={() => clearSearch()}
          value={searchedFriend}
          placeholder="Enter a friend's email..."
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={() => this.handleSubmit()}
        />
        <Divider />
      </View>

      <AddedFriends />

    </View>
    );
  }
};

const styles = StyleSheet.create({
  container2: {
    flex: 2,
    paddingTop: 5,
    paddingBottom: 10
  }
});
