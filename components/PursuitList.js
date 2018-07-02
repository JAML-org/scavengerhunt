import React from 'react';
import styles, { colors } from './style';
import { View, ImageBackground } from 'react-native';
import { Icon, Text, Divider } from 'react-native-elements';
import * as firebase from 'firebase';

//Abstract mapping of hunts into it's own component

class PursuitList extends React.Component {
  constructor() {
    super();
    this.state = {
      hunts: {},
    };
  }

  async componentDidMount() {
    try {
      let response = await firebase.database().ref('/Hunts');
      let snapshot = await response.once('value');
      this.setState({
        hunts: snapshot.val(),
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hunts } = this.state;
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <View style={{ width: '100%', height: '25%' }}>
              <Text h4 style={styles.header}>
                Choose a Pursuit
              </Text>
              <Divider />
            </View>
            {Object.keys(hunts).map(hunt => {
              return (
                <View key={hunt}>
                  <Icon
                    raised
                    name={hunts[hunt].icon}
                    type="material-community"
                    size={40}
                    onPress={() =>
                      navigate('HuntDetails', {
                        hunt: hunts[hunt],
                        huntName: hunt,
                        huntLocationsID: hunts[hunt].locations2,
                      })
                    }
                  />
                  <Text style={styles.textCenter}>{hunt}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default PursuitList;
