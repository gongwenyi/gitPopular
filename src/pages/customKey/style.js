import { StyleSheet, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    width: '50%',
  },
});

export default styles;
