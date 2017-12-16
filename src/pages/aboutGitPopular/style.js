import { StyleSheet, Dimensions, Platform } from 'react-native';
import { PAGE_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR, DISABLED_BUTTON_BACKGROUND_COLOR } from './../../theme/color';

const window = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 70;
const PADDING_TOP = 20;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    width: '100%',
    height: STICKY_HEADER_HEIGHT,
    paddingTop: PADDING_TOP,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickySectionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: STICKY_HEADER_HEIGHT,
    paddingTop: PADDING_TOP,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixedSectionBtn: {
    paddingLeft: 12,
    paddingRight: 15,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});


export default styles;
