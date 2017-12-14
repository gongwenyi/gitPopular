/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Cell } from './../../components';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import { CommonImgs } from './../../theme/images';
import styles from './style';

const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 40;

class Talks extends Component {
  constructor(props) {
    super(props);
    this.state =  {

    };
  }

  _handleBackClick() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <View style={styles.rootContainer}>
        <StatusBar
          backgroundColor={NAVBAR_BACKGROUND_COLOR}
          barStyle="light-content"
        />
        <ParallaxScrollView
          onScroll={onScroll}
          backgroundColor={NAVBAR_BACKGROUND_COLOR}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          backgroundSpeed={10}

          renderBackground={() => (
            <View key="background">
              <Image
                source={CommonImgs.reactnative}
                style={{ width: '100%', height: PARALLAX_HEADER_HEIGHT }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,.6)',
                  height: PARALLAX_HEADER_HEIGHT,
                }}
              />
            </View>
          )}

          renderForeground={() => (
            <View key="parallax-header" style={styles.parallaxHeader}>
              <Icon name="logo-github" size={90} color="#fff" />
              <Text style={styles.sectionSpeakerText}>git popular</Text>
              <Text style={styles.sectionTitleText}>this is a github most popular repositories and trending repositories viewer with React Native</Text>
            </View>
          )}

          renderStickyHeader={() => (
            <View key="sticky-header" style={styles.stickySection}>
              <Text style={styles.stickySectionText}>git popular</Text>
            </View>
          )}

          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <TouchableOpacity
                onPress={() => this._handleBackClick()}
                style={styles.fixedSectionBtn}
              >
                {
                  Platform.OS === 'ios' ?
                    <Icon name="ios-arrow-back" size={30} color="#fff" />
                    :
                    <Icon name="md-arrow-back" size={30} color="#fff" />
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.fixedSectionBtn}
              >
                <Icon name="md-share" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        >
          <View>
            <Cell
              onPress={() => {}}
              leftIcon={<Icon name="md-desktop" size={22} color={NAVBAR_BACKGROUND_COLOR} />}
              leftLabel="项目详情"
            />
            <Cell
              onPress={() => {}}
              leftIcon={<Icon name="md-person" size={22} color={NAVBAR_BACKGROUND_COLOR} />}
              leftLabel="关于作者"
            />
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}
export default Talks;