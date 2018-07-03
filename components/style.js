import { StyleSheet } from 'react-native';

export const colors = {
  green: '#73f442',
  mediumblue: '#85e7de',
  lightblue: '#9ffae4',
  bgColor: '#e4eee9',
  lighterbg: '#eef8f4',
  black: '#000',
  white: '#fff',
  gray: '#5d5f5f',
  pink: '#d667cd',
  orange: '#f5a847',
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: colors.lightblue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  header: {
    color: colors.mediumblue,
    textAlign: 'left',
  },
  textinput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: colors.orange,
    fontSize: 18,
    fontFamily: 'Kohinoor Bangla',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.mediumblue,
    alignSelf: 'stretch',
    paddingVertical: 15,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
  },
  linkText: {
    color: colors.mediumblue,
    fontFamily: 'Kohinoor Bangla',
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
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
    backgroundColor: colors.black,
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
  },
  map: {
    width: '100%',
    height: 300,
  }
});

export default styles;
