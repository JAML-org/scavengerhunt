import React from 'react';
import Modal from 'react-native-modalbox';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const GameModal = (props, ref) => {

  const screen = Dimensions.get('window')

  return (
    <Modal
      style={styles.modal}
      position={'bottom'}
      ref={ref}
      swipeArea={20}
    >
      <ScrollView>
        <View style={{ width: screen.width, paddingLeft: 10 }}>
          {props.children}
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  }
})

export default GameModal
