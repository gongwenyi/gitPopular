import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
  },
  container: {
    height: 45,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  leftLabelStyle: {
    fontSize: 15,
    color: '#333',
    marginHorizontal: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  rightLabelStyle: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 5,
  },
  rightDefaultIconStyle: {
    width: 20,
    height: 20,
  },
  shotBorder: {
    marginLeft: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  longBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
});

export default styles;
