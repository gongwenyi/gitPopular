import './src/storage';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './src/store/createStore';
import App from './src/App';

const store = createStore();
global.store = store;

export default class LaiBa extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('gitPopular', () => LaiBa);
