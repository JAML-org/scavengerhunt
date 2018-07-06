import React, { Component } from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { Divider, Text, List, ListItem } from 'react-native-elements';
import styles, { colors } from './style';

const dummyData = [
  { id: 7, icon: 'filmstrip', name: 'Film Locations', pursuitNo: 'pursuit 1' },
  { id: 2, icon: 'food-variant', name: 'Famous Eats', pursuitNo: 'pursuit 2' },
  { id: 3, icon: 'guitar-electric', name: 'Music', pursuitNo: 'pursuit 3' },
  { id: 3, icon: 'guitar-electric', name: 'Music', pursuitNo: 'pursuit 4' },
];

export default class MyPursuitList extends Component {
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
        <View style={styles.container}>
          <View style={{ width: '100%', height: '10%' }}>
            <Text h3 style={styles.header}>
              MY PURSUIT LIST
            </Text>
          </View>
          <Divider style={{ backgroundColor: colors.orange }} />
          <ScrollView style={styles.container3}>
            <List>
              {dummyData.map(dummy => {
                return (
                  <ListItem
                    key={dummy.pursuitNo}
                    title={dummy.name}
                    subtitle={dummy.pursuitNo}
                    leftIcon={{ name: dummy.icon, type: 'material-community' }}
                  />
                );
              })}
            </List>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
