/**
 * 导航栏组件
 */

import React, { Component } from 'react';
import {
  StatusBar,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Image,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import styles from './style';

export default class NavBar extends Component {
  /**
   * 类型检查
   */
  static propTypes = {
    hideBackBtn: PropTypes.bool, // 是否隐藏返回按钮
    nav: PropTypes.object, // react-navigation navigation
    backBtnClick: PropTypes.func, // 返回按钮点击事件
    title: PropTypes.string, // 导航栏标题
    rightBtnContainerStyle: ViewPropTypes.style, // 导航栏右侧按钮容器样式
    rightBtnText: PropTypes.string, // 导航栏右侧按钮文字
    rightBtnTextStyle: Text.propTypes.style, // 导航栏右侧按钮文字样式
    rightBtnTextClick: PropTypes.func, // 导航栏右侧按钮文字点击事件
    rightBtnIcon: PropTypes.string, // 导航栏右侧按钮图标
    rightBtnIconStyle: Text.propTypes.style, // 导航栏右侧按钮图标样式
    rightBtnIconClick: PropTypes.func, // 导航栏右侧按钮图标点击事件
    rightContent: PropTypes.element, // 导航栏右侧自定义内容
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 返回按钮点击事件
  _handleBackClick() {
    if (this.props.backBtnClick) {
      this.props.backBtnClick();
    } else {
      this.props.nav.goBack();
    }
  }

  // 右侧文字按钮点击事件
  _handleRightBtnTextClick() {
    if (this.props.rightBtnTextClick) {
      this.props.rightBtnTextClick();
    }
  }

  // 右侧图标按钮点击事件
  _handleRightBtnIconClick() {
    if (this.props.rightBtnIconClick) {
      this.props.rightBtnIconClick();
    }
  }

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={NAVBAR_BACKGROUND_COLOR}
          barStyle="light-content"
        />
        { Platform.OS === 'ios' && <View style={{ height: 20, backgroundColor: NAVBAR_BACKGROUND_COLOR }} />}
        <View style={styles.content}>
          {/* 标题 */}
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text>
          </View>
          {/* 返回按钮 */}
          {
            this.props.hideBackBtn ?
            null
            :
            <TouchableOpacity
              onPress={() => this._handleBackClick()}
              style={styles.leftContainer}
            >
              {
                Platform.OS === 'ios' ?
                  <Icon name="ios-arrow-back" size={30} color="#fff" />
                  :
                  <Icon name="md-arrow-back" size={30} color="#fff" />
              }
            </TouchableOpacity>
          }
          {/* 右边按钮(可以是图标或文字) */}
          <View style={styles.rightContainer}>
            { this.props.rightBtnText &&
              <TouchableOpacity
                onPress={() => this._handleRightBtnTextClick()}
                style={[styles.rightBtnContainerStyle, this.props.rightBtnContainerStyle]}
              >
                <Text style={[styles.rightBtnTextStyle, this.props.rightBtnTextStyle]}>{this.props.rightBtnText}</Text>
              </TouchableOpacity>
            }
            { this.props.rightBtnIcon &&
              <TouchableOpacity
                style={[styles.rightBtnContainerStyle, this.props.rightBtnContainerStyle]}
                onPress={() => this._handleRightBtnIconClick()}
              >
                <Image source={this.props.rightBtnIcon} style={[styles.rightBtnIconStyle, this.props.rightBtnIconStyle]} />
              </TouchableOpacity>
            }
            {
              this.props.rightContent && this.props.rightContent
            }
          </View>
        </View>
      </View>
    );
  }
}
