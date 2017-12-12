/**
 * 项目详情页面
 */
import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { NavBar, Loading } from './../../components';
import styles from './style';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', // 项目名称
      url: '', // 项目url地址
      isLoading: false, // 是否loading中
    };
  }
  componentWillMount() {
    const { state } = this.props.navigation;
    console.log(state);
    this.setState({
      title: state.params.title,
      url: state.params.url,
    });
  }
  componentDidMount() {

  }

  _onLoadStart() {
    this.setState({ isLoading: true });
  }

  _onLoadEnd() {
    this.setState({ isLoading: false });
  }

  render() {
    const { title, url, isLoading } = this.state;
    return (
      <View style={styles.rootContainer}>
        <NavBar
          title={title}
          nav={this.props.navigation}
          rightBtnText="分享"
        />
        { isLoading && <Loading />}
        <WebView
          source={{ uri: url }}
          onLoadStart={() => this._onLoadStart()}
          onLoadEnd={() => this._onLoadEnd()}
        />
      </View>
    );
  }
}
