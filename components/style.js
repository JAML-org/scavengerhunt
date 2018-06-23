import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#36485f',
    paddingLeft: 20,
    paddingRight: 20,
    // paddingTop: 75,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  textListItem: {
    width: 85,
    height: 85,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default styles;
