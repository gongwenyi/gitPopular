import { StyleSheet, Layout } from 'react-native';
import { BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  wrapper: {

  },
  slide: {
    flex: 1,
  },
  btnContainer: {
    position: 'absolute',
    left: 0,
    bottom: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 110,
    paddingVertical: 12,
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default styles;
