import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Divider,
  List,
  ListItem,
  SearchBar,
} from 'react-native-elements';
import FriendCard from './FriendCard';

const FriendsList = props => {
  const { search, friends, clearSearch, searchedFriend, select } = props;
  return (
    <View style={styling.flex1}>
      <SearchBar
        lightTheme
        showLoading
        clearIcon={true}
        onChangeText={text => search(text)}
        onClear={() => clearSearch()}
        value={searchedFriend}
        placeholder="Search Friend"
      />
      <Divider />
      {friends ? (
        <List>
          {friends.map(friend => (
            <FriendCard friend={friend} key={friend} select={select} />
          ))}
        </List>
      ) : (
        <Text h4 style={{ color: 'white' }}>
          Add Friends
        </Text>
      )}
    </View>
  );
};

const styling = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default FriendsList;
