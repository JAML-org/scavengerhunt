import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, ScrollView } from 'react-native';
import { Icon, Divider, Text, List, ListItem } from 'react-native-elements'
import styles from './style';

const dummyData = [
  { id: 7, icon: "filmstrip", name: "Film Locations", pursuitNo: "pursuit 1" },
  { id: 2, icon: "food-variant", name: "Famous Eats", pursuitNo: "pursuit 2" },
  { id: 3, icon: "guitar-electric", name: "Music", pursuitNo: "pursuit 3" },
  { id: 3, icon: "guitar-electric", name: "Music", pursuitNo: "pursuit 4" },
]

const dummyStyling = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 80,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    color: '#85e7de',
    textAlign: 'left',
  },
})

export default class MyHuntList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={dummyStyling.container}>
          <View style={{ width: '100%', height: '25%' }}>
            <Text h4 style={styles.header}>
              Continue A Pursuit
              </Text>
          </View>
          <Divider />
          <ScrollView style={styles.container3}>
            <List>
              {
                dummyData.map(dummy => {
                  return (
                    <ListItem
                      key={dummy.pursuitNo}
                      title={dummy.name}
                      subtitle={dummy.pursuitNo}
                      leftIcon={{ name: dummy.icon, type: "material-community" }}
                    />
                  )
                }
                )
              }
            </List>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

// const styling = StyleSheet.create({
//   buttonList: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 30,
//   },
//   btn: {
//     borderRadius: 20,
//   }
// });
