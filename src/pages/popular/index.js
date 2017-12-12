/**
 * 最热项目页面
 */
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View, Text, Image, ImageBackground, Platform } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { NavBar } from './../../components';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import styles from './style';
import PopularFlatList from './popularFlatList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [], // 用户订阅的标签
      selectedPage: 0, // 默认显示的标签
    };
  }

  componentWillMount() {
    console.log('popular====================================');
    console.log(this.props);
    console.log('====================================');
    this._loadTags(); // 获取用户订阅的标签
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popular.updatePopularTags.update) { // 如果自定义标签页更新了标签
      this._loadTags();
    }
  }

  // 获取用户订阅的标签
  _loadTags() {
    const tags = [];
    global.tags.map((item) => {
      if (item.checked) {
        tags.push(item);
      }
      return true;
    });
    this.setState({ tags, selectedPage: 0 });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          hideBackBtn
          title="Popular"
        />
        <ScrollableTabView
          style={{}}
          initialPage={0}
          page={this.state.selectedPage}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 1 }}
          tabBarBackgroundColor={NAVBAR_BACKGROUND_COLOR}
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#ececec"
        >
          {
            this.state.tags.map(item => <PopularFlatList key={item.name} tabLabel={item.name} path={item.path} navigation={this.props.navigation} />)
          }

          {/* <PopularFlatList tabLabel="react" navigation={this.props.navigation} />
          <PopularFlatList tabLabel="react-native" navigation={this.props.navigation} />
          <PopularFlatList tabLabel="javascript" navigation={this.props.navigation} /> */}
        </ScrollableTabView>
      </View>
    );
  }
}

export default connect(
  state => ({
    nav: state.nav,
    popular: state.popular,
  }),
)(Home);
