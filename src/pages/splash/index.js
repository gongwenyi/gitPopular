/**
 * 启动页
 */
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from './../../components';
import styles from './style';
import { GuideImgs } from './../../theme/images';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSwiper: false,
    };
  }

  async componentWillMount() {
    // 加载标签信息, 并写入 global
    try {
      const tags = await global.storage.load({ key: 'Tags' });
      global.tags = tags;
    } catch (err) {
      console.log(err);
    }
    SplashScreen.hide();
    this.props.navigation.navigate('Tabbar');
  }
  componentDidMount() {
    // SplashScreen.hide();
    // this.props.navigation.navigate('Tabbar');
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation;
    if (this.state.showSwiper) {
      return (
        null
      );
    }
    return null;
  }
}

export default connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({

  }),
)(Splash);
