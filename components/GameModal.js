import React from 'react';
import Modal from 'react-native-modalbox';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

const GameModal = props => {
  const screen = Dimensions.get('window');

  return (
    <Modal
      onOpened={props.onOpened}
      style={styles.modal}
      position={'bottom'}
      swipeArea={20}
      isOpen={props.isOpen}
      onClosed={props.onClosed}
    >
      <ScrollView horizontal={true} style={{ width: screen.width }}>
        <View style={{ paddingTop: 20, flexDirection: 'row' }}>
          {props.children}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
});

export default GameModal;
