import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colors } from './style';

export default class FriendCard extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }
  render() {
    const { friend, select } = this.props;
    const { active } = this.state;
    return (
      <ListItem
        containerStyle={styling[active ? 'active' : 'inactive']}
        titleStyle={styling[active ? 'activeText' : 'inactiveText']}
        subtitleStyle={styling[active ? 'activeText' : 'inactiveSubText']}
        roundAvatar
        title={friend.name}
        subtitle={`Username: ${friend.username}`}
        avatar={{ uri: friend.avatar }}
        onPress={() => {
          this.setState({ active: !active });
          select(friend.userId);
        }}
      />
    );
  }
}

const styling = StyleSheet.create({
  active: {
    backgroundColor: colors.orange,
  },
  inactive: {
    backgroundColor: colors.white,
  },
  activeText: {
    color: colors.white,
  },
  inactiveText: {
    color: colors.black,
  },
  inactiveSubText: {
    color: colors.gray,
  },
});
