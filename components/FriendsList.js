import React from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, List, ListItem, SearchBar } from 'react-native-elements'

const FriendsList = (props) => {

  const { search, friends, clearSearch, searchedFriend, select } = props
  return (
    <View>
      <View >
        <SearchBar
          lightTheme
          showLoading
          clearIcon={true}
          onChangeText={(text) => search(text)}
          onClear={() => clearSearch()}
          value={searchedFriend}
          placeholder='Search Friend' />
        <Divider />
      </View>
      <View>
        {friends ?
          <List>
            {friends.map(friend => (
              <ListItem
                key={friend}
                roundAvatar
                title={friend.name}
                subtitle={`Username: ${friend.username}`}
                avatar={{ uri: friend.avatar }}
                onPress={() => { select(friend.userId) }}
              />
            ))}
          </List>
          : (<Text h4 style={{ color: 'white' }}>Add Friends</Text>)
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default FriendsList
