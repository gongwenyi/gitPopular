import { StyleSheet, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  item: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  desc: {
    paddingVertical: 10,
    fontSize: 14,
    color: '#666',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#666',
  },
  avatarContainer: {
    width: 20,
    height: 20,
    borderRadius: 20,
    // backgroundColor: '#fff',
    overflow: 'hidden',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: Platform.OS === 'ios' ? 0 : 20,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  noMoreView: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#aaa',
  },
  noMoreText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 15,
  },
});

export default styles;
