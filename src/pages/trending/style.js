import { StyleSheet, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  tabs: {
    height: 66,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0194d9',
  },
  tab: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#f00',
  },
  tabText: {
    color: '#fff',
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemLeft: {
    width: 46,
    height: 46,
    borderRadius: 46,
    overflow: 'hidden',
  },
  itemCenter: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemRight: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: Platform.OS === 'ios' ? 0 : 46,
  },
  nickName: {
    fontSize: 13,
  },
  description: {
    marginTop: 5,
    fontSize: 12,
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
