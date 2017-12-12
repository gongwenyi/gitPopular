import { StyleSheet, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingLeft: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  rowText: {
    paddingLeft: 15,
    color: '#333',
  },
});

export default styles;
