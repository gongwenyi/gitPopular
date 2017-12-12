import { StyleSheet, Platform } from 'react-native';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  content: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  leftContainer: {
    position: 'absolute',
    left: 0,
    height: '100%',
    paddingLeft: 12,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
  },
  rightBtnContainerStyle: {
    height: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  rightBtnTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
});

export default styles;
