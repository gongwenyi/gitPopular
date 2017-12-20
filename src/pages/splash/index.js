/**
 * 启动页
 */
import React, { Component } from 'react';
import { Platform, ScrollView, TouchableOpacity, View, Text, Image, Alert, Linking, NativeAppEventEmitter } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RNKitCodePush from 'rnkit-code-push';
import rnkitCodePushConfig from './../../../rnkit-code-push.json';
import { Button, Toast } from './../../components';
import styles from './style';
import { GuideImgs } from './../../theme/images';
console.log(rnkitCodePushConfig);
const { appKey } = rnkitCodePushConfig[Platform.OS]; // 热更新appKey

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSwiper: false,
    };
    this.isDev = __DEV__ ? true : false;
    this.CodePush = new RNKitCodePush(appKey, this.isDev);
  }

  async componentWillMount() {
    // 加载标签信息, 并写入 global
    try {
      const tags = await global.storage.load({ key: 'Tags' });
      global.tags = tags;
    } catch (err) {
      console.log(err);
    }
    // 加载语言信息, 并写入 global
    try {
      const langs = await global.storage.load({ key: 'Langs' });
      global.langs = langs;
    } catch (err) {
      console.log(err);
    }
    // SplashScreen.hide();
    // this.props.navigation.navigate('Tabbar');
  }
  async componentDidMount() {
    if (this.isDev) { // 开发环境，不检查更新
      Toast.showShortCenter('开发环境');
      // this._routerToTabBar();
    } else if (this.CodePush.isFirstTime) {
      await this.CodePush.markSuccess();
    } else if (this.CodePush.isRolledBack) {
      console.log('提示', '刚刚更新失败了,版本被回滚.');
    }
    await this._checkUpdateVersion(); // 检查更新

    // SplashScreen.hide();
    // this.props.navigation.navigate('Tabbar');
  }

  // 检查更新
  async _checkUpdateVersion() {
    try {
      const info = await this.CodePush.checkUpdate();
      console.log(info);
      if (info.expired) { // 该应用包(原生部分)已过期，需要前往应用市场下载新的版本
        if (info.downloadUrl) { // 返回了下载链接
          Alert.alert(
            '提示',
            '您的应用版本已更新,请前往应用商店下载新的版本',
            [
              { text: '确定', onPress: () => Linking.openURL(info.downloadUrl) },
            ],
          );
        } else {
          this._routerToTabBar();
        }
      } else if (info.upToDate) { // 当前已经是最新，无需进行更新
        this._routerToTabBar();
      } else if (info.update) { // 当前有新版本可以更新
        if (info.is_silent) { // 如果是静默更新，先进入Tabbar页面，然后下载新版本，第二次启动APP自动应用更新
          this._routerToTabBar();
          await this._doUpdate(info);
        } else if (info.is_mandatory) { // 如果是强制更新
          await this._doUpdate(info);
        } else { // 非静默、非强制更新，提示用户
          Alert.alert(
            '更新提示',
            `检查到新版本[${info.name}]，是否下载更新？\n${info.description}`,
            [
              { text: '下次再说', onPress: () => this._routerToTabBar() },
              { text: '立即下载', onPress: () => this._doUpdate(info) },
            ],
          );
        }
      } else { // 没有更新
        this._routerToTabBar();
      }
    } catch (error) {
      console.log('检查更新异常');
      console.log(error);
      this._routerToTabBar();
    }
  }

  // 跳转到Tabbar页面
  _routerToTabBar() {
    SplashScreen.hide();
    this.props.navigation.navigate('Tabbar');
  }

  // 执行更新
  async _doUpdate(info) {
    if (!info.is_silent) { // 如果是非静默更新，显示更新进度
      NativeAppEventEmitter.addListener('RNKitCodePushDownloadProgress', (params) => {
        Toast.showShortCenter('正在下载补丁包，请稍等');
      });
      NativeAppEventEmitter.addListener('RNKitCodePushUnzipProgress', (params) => {
        Toast.showShortCenter('正在解压补丁包，请稍等');
      });
    }
    try {
      // downloadUpdate的返回值是一个hash字符串，它是当前版本的唯一标识。你可以使用switchVersion函数立即切换版本(此时应用会立即重新加载)，或者选择调用 switchVersionLater，让应用在下一次启动的时候再加载新的版本
      const hash = await this.CodePush.downloadUpdate(info);
      if (info.is_silent) { // 如果是静默更新，让应用在下一次启动的时候再加载新的版本
        this.CodePush.switchVersionLater(hash);
      } else {
        Toast.showShortCenter('解压完成');
        if (info.is_mandatory) { // 如果是强制更新，立即切换版本(此时应用会立即重新加载)
          await this.CodePush.switchVersion(hash);
          this._routerToTabBar();
        } else { // 非强制更新
          Alert.alert(
            '更新提示',
            '补丁包已经下载完成，是否立即使用',
            [
              { text: '稍后再说', onPress: () => { this._routerToTabBar(); this.CodePush.switchVersionLater(hash); } },
              { text: '立即使用', onPress: async () => { await this.CodePush.switchVersion(hash); this._routerToTabBar(); } },
            ],
          );
        }
      }
    } catch (error) {
      console.log('执行更新异常');
      console.log(error);
      this._routerToTabBar();
    }
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
