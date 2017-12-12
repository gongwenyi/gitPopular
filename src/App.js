import React, { Component } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';
import Routers from './routers';

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this._onBackPress());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this._onBackPress());
  }

  _onBackPress() {
    const { dispatch, nav } = this.props;
    console.log('Back pressed', nav);
    const activeRoute = nav.routes[nav.index];
    // if (activeRoute.index === 0) {
    //   return false;
    // }
    // dispatch(NavigationActions.back());
    // return true;
    if (activeRoute.index === 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        // 最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }

    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <Routers navigation={addNavigationHelpers({
        dispatch,
        state: nav,
      })}
      />
    );
  }
}

export default connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({
    dispatch,
  }),
)(App);
