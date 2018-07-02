import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import GameMap from './GameMap';
import GameButton from './GameButton';
import GameTargetsView from './GameTargetsView';
import GameModal from './GameModal';
import HotCold from './HotCold';

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
    };

    this.inPerimeter = this.inPerimeter.bind(this);
    this.renderList = this.renderList.bind(this);
    this.selectTarget = this.selectTarget.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.getScores = this.getScores.bind(this);
    this.checkTargetList = this.checkTargetList.bind(this);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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

  async checkTargetList(gameId, playerId) {
    let gameStatus = await firebase
      .database()
      .ref(`/Games/${gameId}/players/${playerId}`).once('value')
      let statusArr = gameStatus.val()
    console.log('THIS IS GAME STATUS=============', gameStatus);
    console.log('THIS IS STAT ARR===========', statusArr)
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
        [+selectedTarget.id]: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getScores() {
    //go into Games
    //match playerID to user
    //Sort based on points`
  }

  gameStatus() {
    //check for existence of winner field in game
  }

  async renderList() {
    const { getParam } = this.props.navigation;
    const huntName = getParam('huntName', 'NO-HUNT');
    let list = [];
    try {
      const hunts = await firebase
        .database()
        .ref('/Hunts')
        .once('value');
      const targets = await firebase
        .database()
        .ref('/Locations')
        .once('value');
      const huntsVal = hunts.val();
      const locations = targets.val();
      const huntLocationArr = huntsVal[huntName].locations;

      for (let i = 0; i < huntLocationArr.length; i++) {
        let target = locations[+huntLocationArr[i]];
        list.push([target, huntLocationArr[i]]);
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
          <Text>These are the scores.</Text>
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
