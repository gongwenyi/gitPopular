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
import PopularFlatList from './popularFlatList';

const optionsStyles = {
  optionsContainer: {
    width: 140,
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [], // 用户订阅的标签
      opened: false, // popularMenu是否显示
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
    this.setState({ tags });
  }

  _onOptionSelect(value) {
    // alert(`Selected number: ${value}`);
    const { navigate } = this.props.navigation;
    this.setState({ opened: false });
    switch (value) {
      case 1: navigate('CustomKey');
        break;
      case 2: navigate('SortKey');
        break;
      default:
        break;
    }
  }

  _onTriggerPress() {
    this.setState({ opened: true });
  }

  _onBackdropPress() {
    this.setState({ opened: false });
  }

  _customBackHandler() {
    this.setState({ opened: false });
    return true;
  }


  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          hideBackBtn
          title="Popular"
          rightContent={
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                <Icon name="ios-search" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onTriggerPress()} style={{ paddingHorizontal: 18 }}>
                <Icon name="md-more" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          }
        />
        {
          this.state.opened ?
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, zIndex: 2 }}>
              <MenuContext
                style={{ flexDirection: 'column', alignItems: 'flex-end', paddingTop: Platform.OS === 'ios' ? 60 : 40  }}
                backHandler={() => this._customBackHandler()}
              >
                <Menu
                  opened={this.state.opened}
                  onBackdropPress={() => this._onBackdropPress()}
                  onSelect={value => this._onOptionSelect(value)}
                >
                  <MenuTrigger
                    onPress={() => this._onTriggerPress()}
                    text=""
                  />
                  <MenuOptions
                    customStyles={optionsStyles}
                  >
                    <MenuOption value={1} text="自定义标签" />
                    <MenuOption value={2} text="标签排序" />
                    <MenuOption value={3} text="分享" />
                  </MenuOptions>
                </Menu>
              </MenuContext>
            </View>
          :
            null
        }
        {
          this.state.tags.length ?
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
                this.state.tags.map(item => <PopularFlatList key={item.name} tabLabel={item.name} path={item.path} navigation={this.props.navigation} />)
              }

              {/* <PopularFlatList tabLabel="react" navigation={this.props.navigation} />
              <PopularFlatList tabLabel="react-native" navigation={this.props.navigation} />
              <PopularFlatList tabLabel="javascript" navigation={this.props.navigation} /> */}
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
)(Home);

