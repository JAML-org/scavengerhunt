import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

export default class GameModal extends Component {


  render() {
    const screen = Dimensions.get('window')
    return (
      <Modal
        style={styles.modal}
        position={'bottom'}
        ref={this.props.refName}
        swipeArea={20}
      >
        <ScrollView>
          <View style={{ width: screen.width, paddingLeft: 10 }}>
            {this.props.children}
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  }
})
