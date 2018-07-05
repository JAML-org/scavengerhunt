import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import styles from './style';

export default class GameScores extends Component {
  constructor() {
    super();
    this.state = {
      scoreBoard: [],
    };
  }

  async componentDidMount() {
    try {
      const scoresAndPlayers = await firebase
        .database()
        .ref(`/Games/${this.props.gameId}/players`)
        .once('value')
        .then(snap => snap.val());

      const playerIds = Object.keys(scoresAndPlayers);

      const playerProfile = await firebase
        .database()
        .ref(`/Users`)
        .once('value')
        .then(snap => snap.val());
      const scoreBoard = playerIds.map(id => ({
        avatar: playerProfile[id].avatar,
        name: playerProfile[id].name,
        score: Object.values(scoresAndPlayers[id]).filter(score => score)
          .length,
      }));
      this.setState({ scoreBoard });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { scoreBoard } = this.state;

    return (
      <View style={styles.scoreBoard}>
        {scoreBoard.map(status => (
          <View key={status.name} flexDirection="row">
            <Avatar size="small" rounded source={{ uri: status.avatar }} />
            <Text style={styles.scoreText}>
              {status.name}: {status.score}0/50
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
