import React from 'react'
import { StyleSheet, View, } from 'react-native';
import { Text, Divider, List, ListItem, SearchBar } from 'react-native-elements'

// const fakeFriends = {
//   "H3zfrmvnhYg939HKxnAvwA6KMAB3": { name: "Jenny", avatar: "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/111.png", username: "Jg23" }
// }

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

const Friends = (props) => {
  const friends = props.friends

  return (
    <View>
      <View >
        <SearchBar
          lightTheme
          // onChangeText={someMethod}
          // onClear={someMethod}
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
              />
            ))}
          </List>
          : (<Text h4 style={{ color: 'white' }}>Add Friends</Text>)
        }
      </View>
    </View>
  )
}

export default Friends
