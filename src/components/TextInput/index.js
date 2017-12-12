/**
 * 导航栏组件
 */

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { CommonImgs } from './../../theme/images';
import styles from './style';

export default class Input extends Component {
  /**
   * 设置默认值
   */
  static defaultProps = {
    showClear: true, // 是否显示清空输入框按钮（默认显示）
    autoFocus: false, // 是否自动获取焦点
    editable: true, // 是否可编辑
    keyboardType: 'default', // 键盘类型
  };

  /**
   * 类型检查
   */
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false, // 输入框是否是获取焦点状态
    };
  }
  // 获取焦点
  _onFocus() {
    this.setState({
      isFocus: true,
    });
    this.props.onFocus && this.props.onFocus();
  }
  // 失去焦点
  _onBlur() {
    this.setState({
      isFocus: false,
    });
    this.props.onBlur && this.props.onBlur();
  }
  // 输入发生改变
  _onChangeText(value) {
    this.props.onChangeText && this.props.onChangeText(value);
  }
  // 清空输入框
  _onClear() {
    this.props.onChangeText && this.props.onChangeText('');
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.left, this.props.leftContainerStyle]}>
          { this.props.leftIcon && <Image source={this.props.leftIcon} style={[styles.leftIconStyle, this.props.leftIconStyle]} /> }
          { this.props.leftLabel && <Text style={[styles.leftLabelStyle, this.props.leftLabelStyle]}>{ this.props.leftLabel }</Text> }
        </View>
        <View style={styles.center}>
          <TextInput
            style={[styles.input, this.props.inputStyle]}
            secureTextEntry={this.props.secureTextEntry}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            clearButtonMode="never"
            autoFocus={this.props.autoFocus}
            editable={this.props.editable}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            onFocus={() => this._onFocus()}
            onBlur={() => this._onBlur()}
            secureTextEntry={this.props.secureTextEntry}
            onChangeText={value => this._onChangeText(value)}
            value={this.props.value}
          />
        </View>
        <View style={styles.right}>
          { this.props.rightIcon &&
            <TouchableOpacity style={styles.rightIconContainer} onPress={() => { this.props.handleRightIconClick && this.props.handleRightIconClick(); }}>
              <Image source={this.props.rightIcon} style={[styles.rightIconStyle, this.props.rightIconStyle]} />
            </TouchableOpacity>
          }
          {/* 清空输入框按钮 */}
          { this.props.showClear && this.state.isFocus &&
            <TouchableOpacity style={styles.rightIconContainer} onPress={() => this._onClear()}>
              <Image source={CommonImgs.input_clear} style={styles.rightIconStyle} />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}
