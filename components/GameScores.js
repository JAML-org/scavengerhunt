import React, { Component } from 'react';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

export default class GameScores extends Component {
  constructor() {
    super()
    this.state = {
      scoreBoard: []
    }
  }

  async componentDidMount() {
    try {
      const scoresAndPlayers = await firebase.database().ref(`/Games/${this.props.gameId}/players`).once('value')
      const playerNames = await Object.keys(scoresAndPlayers.val())
      const playerData = await scoresAndPlayers.val()
      const scoreBoard = playerNames.map(name => ({
        name,
        score: playerData[name].filter(s => s === true).length
      }))
      this.setState({ scoreBoard })
    } catch (error) { console.error(error) }
  }

  render() {
    const { scoreBoard } = this.state
    console.log(this.state)
    return (
      <View>
        {
          scoreBoard.map(status => <Text key={status.name}>{status.name} : {status.score}</Text>)
        }
      </View>
    )
  }
}
