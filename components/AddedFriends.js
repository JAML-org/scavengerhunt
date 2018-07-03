import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    Text,
    List,
    ListItem,
  } from 'react-native-elements';
import * as firebase from 'firebase';
 
export default class AddedFriends extends Component {
    constructor() {
        super();
        this.state = {
            friends: []
        }
    }

    async componentDidMount() {
        const currentUserId = await firebase.auth().currentUser.uid
        const allUsersLink = await firebase.database().ref('/Users/').once('value')
        const allUsers = allUsersLink.val();
        const allUsersKey = Object.keys(allUsers);

        //Getting an array of objects for all users, each element is an object of a single user's info
        const allUsersArr = allUsersKey.map(user => {
            return allUsers[user]
        })

        //Getting the friends array for the current user. Each element in the array is a email string
        const currentUserFriendsLink = await firebase.database().ref(`/Users/${currentUserId}/friends`)
        
        this.friends = [];
        currentUserFriendsLink.on('child_added', (dataSnapShot) => {
            let email = dataSnapShot.val()

            for(let i = 0; i < allUsersArr.length; i++) {
                if(allUsersArr[i].email === email) {
                   this.friends.push(allUsersArr[i])
                }
            }

            this.setState({
                friends: this.friends
            })
        })
    }

    render() {
        const { friends } = this.state;

        return(
            <ScrollView style={styles.container3}>
                {friends ? (
                <List >
                    {friends.map(friend => (
                        <ListItem
                        key={friend.email}
                        roundAvatar
                        avatar={{ uri: friend.avatar }}
                        title={friend.name}
                        rightElement={`Email: ${friend.email}`}
                        subtitle={`Username: ${friend.username}`}
                        />
                    ))}
                </List>
                ) : (
                <Text h4 style={{ color: 'white' }}>
                    Add Friends by user email!
                </Text>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container3: {
      flex: 3,
      paddingTop: 10,
      paddingBottom: 10
    },
});