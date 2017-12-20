/**
 * 最热项目页面
 */
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, StyleSheet, View, Text, Image, ImageBackground, Platform } from 'react-native';
import { connect } from 'react-redux';
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { NavBar } from './../../components';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import styles from './style';
import TrendingFlatList from './trendingFlatList';

const optionsStyles = {
  optionsContainer: {
    width: 120,
    padding: 10,
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    padding: 10,

  },
  optionTouchable: {
    // underlayColor: 'gold',
    activeOpacity: 50,
  },
  optionText: {
    color: '#333',
  },
};

const SINCE_MAP = [{
  value: '?since=daily',
  name: '今天',
}, {
  value: '?since=weekly',
  name: '本周',
}, {
  value: '?since=monthly',
  name: '本月',
}];

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langs: [], // 用户订阅的语言
      since: '', // trending排行时间
      sinceName: '今天', // trending排行时间
      openedMoreMenu: false, // popularMenu是否显示
    };
  }

  componentWillMount() {
    console.log('popular====================================');
    console.log(this.props);
    console.log('====================================');
    this._loadLangs(); // 获取用户订阅的语言
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popular.updatePopularTags.update) { // 如果自定义语言页更新了语言
      this._loadLangs();
    }
  }

  // 获取用户订阅的语言
  _loadLangs() {
    const langs = [];
    global.langs.map((item) => {
      if (item.checked) {
        langs.push(item);
      }
      return true;
    });
    this.setState({ langs });
  }

  // 渲染导航栏标题区内容
  _renderTitleContent() {
    return (<View style={styles.navbarTitleContainer}>
      <Text style={styles.navbarTitle}>Trending</Text>
      <TouchableOpacity onPress={() => this._onMenuTimeTriggerPress()} style={styles.navbarTimeContainer}>
        <Text style={styles.navbarTime}>{this.state.sinceName}</Text>
        <Icon name="md-arrow-dropdown" size={26} color="#fff" />
      </TouchableOpacity>
    </View>);
  }

  // 渲染导航栏右侧按钮
  _renderRightContent() {
    return (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
        <Icon name="ios-search" size={26} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this._onMenuMoreTriggerPress()} style={{ paddingHorizontal: 18 }}>
        <Icon name="md-more" size={30} color="#fff" />
      </TouchableOpacity>
    </View>);
  }

  // 时间弹出框按钮点击事件
  _onTimeMenuOptionSelect(value) {
    // alert(`Selected number: ${value}`);
    console.log('xxoo');
    this.setState({
      openedTimeMenu: false,
      since: SINCE_MAP[value].value,
      sinceName: SINCE_MAP[value].name,
    });
  }

  // 更多按钮弹出框按钮点击事件
  _onOptionSelect(value) {
    // alert(`Selected number: ${value}`);
    const { navigate } = this.props.navigation;
    this.setState({ openedMoreMenu: false });
    switch (value) {
      case 0: navigate('CustomKey');
        break;
      case 1: navigate('SortKey');
        break;
      default:
        break;
    }
  }

  // 显示隐藏时间按钮弹出框
  _onMenuTimeTriggerPress() {
    this.setState({ openedTimeMenu: true });
  }

  // 显示隐藏更多按钮弹出框
  _onMenuMoreTriggerPress() {
    this.setState({ openedMoreMenu: true });
  }

  _onBackdropPress() {
    this.setState({
      openedTimeMenu: false,
      openedMoreMenu: false,
    });
  }

  _customBackHandler() {
    this.setState({
      openedTimeMenu: false,
      openedMoreMenu: false,
    });
    return true;
  }


  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          hideBackBtn
          titleContent={() => this._renderTitleContent()}
          rightContent={() => this._renderRightContent()}
        />
        {
          this.state.openedTimeMenu ?
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 2 }}>
              <MenuContext
                style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 60  }}
                backHandler={() => this._customBackHandler()}
              >
                <Menu
                  opened={this.state.openedTimeMenu}
                  onBackdropPress={() => this._onBackdropPress()}
                  onSelect={value => this._onTimeMenuOptionSelect(value)}
                >
                  <MenuTrigger
                    onPress={() => this._onMenuTimeTriggerPress()}
                    text=""
                  />
                  <MenuOptions
                    customStyles={optionsStyles}
                  >
                    <MenuOption value={0} text="今天" />
                    <MenuOption value={1} text="本周" />
                    <MenuOption value={2} text="本月" />
                  </MenuOptions>
                </Menu>
              </MenuContext>
            </View>
          :
            null
        }
        {
          this.state.openedMoreMenu ?
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 2 }}>
              <MenuContext
                style={{ flexDirection: 'column', alignItems: 'flex-end', paddingTop: 60  }}
                backHandler={() => this._customBackHandler()}
              >
                <Menu
                  opened={this.state.openedMoreMenu}
                  onBackdropPress={() => this._onBackdropPress()}
                  onSelect={value => this._onOptionSelect(value)}
                >
                  <MenuTrigger
                    onPress={() => this._onMenuMoreTriggerPress()}
                    text=""
                  />
                  <MenuOptions
                    customStyles={optionsStyles}
                  >
                    <MenuOption value={0} text="自定义语言" />
                    <MenuOption value={1} text="语言排序" />
                    <MenuOption value={2} text="分享" />
                  </MenuOptions>
                </Menu>
              </MenuContext>
            </View>
          :
            null
        }
        {
          this.state.langs.length ?
            <ScrollableTabView
              style={{}}
              initialPage={0}
              renderTabBar={() => <ScrollableTabBar />}
              tabBarUnderlineStyle={{ backgroundColor: '#fff', height: 1 }}
              tabBarBackgroundColor={NAVBAR_BACKGROUND_COLOR}
              tabBarActiveTextColor="#fff"
              tabBarInactiveTextColor="#ececec"
            >
              {
                this.state.langs.map(item => <TrendingFlatList key={item.name} tabLabel={item.name} path={item.path} since={this.state.since} navigation={this.props.navigation} />)
              }

              {/* <TrendingFlatList tabLabel="react" navigation={this.props.navigation} />
              <TrendingFlatList tabLabel="react-native" navigation={this.props.navigation} />
              <TrendingFlatList tabLabel="javascript" navigation={this.props.navigation} /> */}
            </ScrollableTabView>
          :
            null
        }
      </View>
    );
  }
}

export default connect(
  state => ({
    nav: state.nav,
    popular: state.popular,
  }),
)(Trending);

