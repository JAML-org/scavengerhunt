import { StyleSheet } from 'react-native';

export const colors = {
  green: '#73f442',
  mediumblue: '#85e7dc',
  lightblue: '#9ffae4',
  bgColor: '#e5efe9',
  lighterbg: '#f3fcf7',
  black: '#000',
  white: '#fff',
  gray: '#bfc3c2',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.bgColor,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  header: {
    color: colors.black,
    textAlign: 'center',
  },
  textinput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    fontSize: 18,
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
  },
  linkText: {
    color: colors.mediumblue,
  },
  textCenter: {
    textAlign: 'center',
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
  },
});

export default styles;
