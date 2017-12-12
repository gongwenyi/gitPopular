import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  leftIconStyle: {
    width: 26,
    height: 26,
    marginHorizontal: 5,
  },
  leftLabelStyle: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 5,
  },
  center: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  input: {
    height: '100%',
    padding: 0,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#f00',
  },
  rightIconContainer: {
    height: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  rightIconStyle: {
    width: 20,
    height: 20,
  },
});

export default styles;
