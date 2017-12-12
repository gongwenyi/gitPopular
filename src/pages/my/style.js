import { StyleSheet, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  userBg: {
    width: '100%',
    height: 230,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: 50,
    borderRadius: 80,
    overflow: 'hidden',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: Platform.OS === 'ios' ? 0 : 80,
  },
  userInfo: {
    alignItems: 'center',
  },
  nickname: {
    marginVertical: 15,
    color: '#fff',
    fontSize: 17,
  },
  starStyle: {
    width: 24,
    height: 24,
  },
  btn: {
    width: 90,
    marginTop: 25,
    paddingVertical: 8,
    backgroundColor: '#32a5d4',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 13,
    color: '#fff',
  },
});

export default styles;
