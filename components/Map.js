import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import GameMap from './GameMap';
import GameButton from './GameButton';
import GameTargetsView from './GameTargetsView';
import GameModal from './GameModal';
import HotCold from './HotCold';
import GameScores from './GameScores';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 5,
      selectedTarget: {},
      targets: [],
      modalTarget: true,
      modalScore: false,
      targetStatus: {},
    };

    this.inPerimeter = this.inPerimeter.bind(this);
    this.renderList = this.renderList.bind(this);
    this.selectTarget = this.selectTarget.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  async componentDidMount() {
    const { getParam } = this.props.navigation;
    let currentGameId = getParam('newGameId');
    let currentPlayerId = getParam('currentPlayer');
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });

    let targetStatus = await firebase
      .database()
      .ref(`/Games/${currentGameId}/players/${currentPlayerId}`)
      .once('value')
      .then(snap => snap.val());
    this.setState({ targetStatus });

    this.renderList();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  selectTarget(target) {
    // console.log('this is target!!', target)
    this.setState({ selectedTarget: target });
  }

  //translates the distance btwn two coordinates from longitude/latitude to kilometers
  distanceInKM(point1, point2) {
    let lat1 = point1.latitude;
    let lon1 = point1.longitude;
    let lat2 = point2.latitude;
    let lon2 = point2.longitude;

    let p = 0.017453292519943295;
    let c = Math.cos;
    let a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  }

  inPerimeter(userCoords, targetCoords) {
    const distance = this.distanceInKM(userCoords, targetCoords);
    console.log('THE CURRENT TARGET', targetCoords);
    let radarMessage = '';
    let color;

    if (distance <= this.state.distance / 1000) {
      color = 'red';
      radarMessage = "you've found it";

      this.updateScore();
    }
    if (distance > 0.005 && distance <= 0.05) {
      color = 'orange';
      radarMessage = 'warm';
    }
    if (distance > 0.05) {
      color = 'blue';
      radarMessage = 'cold';
    }
    // this.setState({ proximity: color })
    return color;
  }

  async updateScore() {
    const { getParam } = this.props.navigation;
    let currentGameId = getParam('newGameId');
    let currentPlayerId = getParam('currentPlayer');
    let selectedTarget = this.state.selectedTarget;

    try {
      //find the current game for player
      let currentGame = await firebase
        .database()
        .ref(`/Games/${currentGameId}/players/${currentPlayerId}`);

      this.checkTargetList(currentGameId, currentPlayerId);

      //Mark target as found
      currentGame.update({
        [selectedTarget.id]: true,
      });
      this.setState({
        targetStatus: {...this.state.targetStatus, [selectedTarget.id]: true},
        selectedTarget: {}
      })
    } catch (error) {
      console.error(error);
    }
  }

  gameStatus() {
    //check for existence of winner field in game
  }

  gameOver() {
    //Add winner to game and to all users in game
  }

  async renderList() {
    const { getParam } = this.props.navigation;
    const huntName = getParam('huntName', 'NO-HUNT');
    let list = [];
    try {
      const huntsVal = await firebase
        .database()
        .ref('/Hunts')
        .once('value')
        .then(snap => snap.val());
      const locations = await firebase
        .database()
        .ref('/Locations2')
        .once('value')
        .then(snap => snap.val());

      const huntLocationArr = huntsVal[huntName].locations2;

      for (let i = 0; i < huntLocationArr.length; i++) {
        let target = {
          ...locations[huntLocationArr[i]],
          id: huntLocationArr[i],
        };
        list.push(target);
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({
      targets: list,
    });
  }

  render() {
    const {
      targets,
      selectedTarget,
      modalScore,
      modalTarget,
      latitude,
      longitude,
    } = this.state;


    const playerId = this.props.navigation.getParam('currentPlayer')
    const gameId = this.props.navigation.getParam('newGameId')
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <GameMap latitude={latitude} longitude={longitude} />
        <HotCold
          inPerimeter={this.inPerimeter}
          latitude={latitude}
          longitude={longitude}
          selectedTarget={selectedTarget}
        />
        <View style={styles.bottomView}>
          <View style={styles.buttonList}>
            <GameButton
              iconName="target"
              buttonName="TARGETS"
              onPress={() => this.setState({ modalTarget: !modalTarget })}
            />
            <GameButton
              iconName="trophy"
              buttonName="SCORES"
              onPress={() => this.setState({ modalScore: !modalScore })}
            />
            {/* <GameButton iconName="radar" buttonName="RADAR" /> */}
          </View>
        </View>
        <GameModal
          isOpen={modalTarget}
          onClosed={() =>
            this.setState({
              modalTarget: false,
            })
          }
        >
          <GameTargetsView
            targets={targets}
            selectedTarget={selectedTarget}
            selectTarget={this.selectTarget}
            targetStatus={this.state.targetStatus}
          />
        </GameModal>
        <GameModal
          isOpen={modalScore}
          onClosed={() =>
            this.setState({
              modalScore: false,
            })
          }
        >
          <GameScores gameId={gameId} playerId={playerId} />
        </GameModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
  },
  buttonList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
