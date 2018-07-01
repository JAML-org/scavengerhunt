import React, { Component } from 'react';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import {
  View, Text, StyleSheet, ScrollView,
  Dimensions, Image, TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

export default class GameTargets extends Component {

  render() {
    return (
      <View>
        <View style={styles.buttonList}>
          <Icon
            name="target"
            color="black"
            reverse
            type="material-community"
            onPress={() => this.refs.targets.open()}
            style={styles.btn}
          />
          <Text>TARGETS</Text>
        </View>
        <Modal style={styles.modal} position={'bottom'}
          ref={'targets'} swipeArea={20} >
          <ScrollView horizontal={true} style={{ width: screen.width }}>
            <View style={{ paddingTop: 20, flexDirection: 'row' }}>
              {targets.map((target, i) => {
                return (
                  <TouchableHighlight
                    style={
                      this.state.selectedTarget.name === target.name ? styles.active : styles.inactive
                    }
                    key={i}
                    onPress={() =>
                      this.selectTarget({
                        name: target.name,
                        latitude: target.coords[0],
                        longitude: target.coords[1],
                      })
                    }
                  >
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{ uri: target.image }}
                    />
                  </TouchableHighlight>
                );
              })}
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
})
