import React, { Component } from 'react';
import { Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Icon from 'react-native-vector-icons/Ionicons';
// import { TabbarImgs } from './../theme/images';

import SplashPage from './../pages/splash'; // 引导页
import PopularPage from './../pages/popular'; // Popular 最热
import TrendingPage from './../pages/trending'; // Trending 趋势
import FavoritePage from './../pages/favorite'; // Favorite 收藏
import RepositoryPage from './../pages/repository'; // 项目详情页
import MyPage from './../pages/my'; // My 我的
import AboutGitPopularPage from './../pages/aboutGitPopular'; // 关于 gitPopular
import CustomKeyPage from './../pages/customKey'; // 自定义标签
import SortKeyPage from './../pages/sortKey'; // 标签排序
import DropDownPage from './../pages/dropdown'; // 标签排序


const Tab = TabNavigator({
  Popular: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Image style={{ width: 24, height: 24, tintColor }} source={TabbarImgs.popular} />
        <Icon name="ios-flame" size={30} color={tintColor} />
      ),
    },
  },
  Trending: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Image style={{ width: 24, height: 24, tintColor }} source={TabbarImgs.trending} />
        <Icon name="md-trending-up" size={26} color={tintColor} />
      ),
    },
  },
  Favorite: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Image style={{ width: 24, height: 24, tintColor }} source={TabbarImgs.favorite} />
        <Icon name="md-heart" size={26} color={tintColor} />
      ),
    },
  },
  My: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        // <Image style={{ width: 24, height: 24, tintColor }} source={TabbarImgs.my} />
        <Icon name="md-person" size={26} color={tintColor} />
      ),
    },
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#0187d0',
    inactiveTintColor: '#979797',
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {
      height: 0, // 如TabBar下面显示有一条线，可以设高度为0后隐藏
    },
    style: {
      backgroundColor: '#fff', // TabBar 背景色
      height: 50,
    },
    labelStyle: {
      fontSize: 12, // 文字大小,
      margin: 0,
    },
  },
});

const Routers = StackNavigator({
  Splash: { // 引导页
    screen: SplashPage,
  },
  Tabbar: { // Tabbar
    screen: Tab,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Repository: { // git项目详情页
    screen: RepositoryPage,
  },
  CustomKey: { // 自定义标签
    screen: CustomKeyPage,
  },
  AboutGitPopular: { // 关于 gitPopular
    screen: AboutGitPopularPage,
  },
  SortKey: { // 标签排序
    screen: SortKeyPage,
  },
  DropDown: { // 标签排序
    screen: DropDownPage,
  },
}, {
  navigationOptions: {
    header: null, // 隐藏导航栏
  },
  transitionConfig: () => (
    { screenInterpolator: CardStackStyleInterpolator.forHorizontal }
  ),
});

export default Routers;
