import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { CommonImgs } from './../../theme/images';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import styles from './style';

export default class Cell extends Component {
  /**
   * 设置默认值
   */
  static defaultProps = {
    onPress: () => {},
    last: false,
  };

  /**
   * 类型检查
   */
  static propTypes = {
    onPress: PropTypes.func, // 点击回调
    containerStyle: ViewPropTypes.style, // 容器样式
    leftIcon: PropTypes.element, // 左侧图标
    // leftLabel: PropTypes.string, // 左侧文字
    leftLabelStyle: Text.propTypes.style, // 左侧文字样式
    rightIcon: PropTypes.element, // 右侧图标
    rightLabel: PropTypes.string, // 右侧文字
    rightLabelStyle: Text.propTypes.style, // 右侧文字样式
    last: PropTypes.bool, // 是否是最后一个cell，如果是最后一个，底部边框是占满容器的
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={styles.rootContainer}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.left}>
            {/* 左侧图标 */}
            { this.props.leftIcon && this.props.leftIcon }
            {/* 左侧文字 */}
            { this.props.leftLabel && <Text style={[styles.leftLabelStyle, this.props.leftLabelStyle]}>{ this.props.leftLabel }</Text> }
          </View>
          <View style={styles.right}>
            {/* 右侧图标 */}
            { this.props.rightIcon && this.props.rightIcon }
            {/* 右侧文字 */}
            { this.props.rightLabel && <Text style={[styles.rightLabelStyle, this.props.rightLabelStyle]}>{ this.props.rightLabel }</Text> }
            {/* 右侧箭头 */}
            <FontAwesomeIcon name="angle-right" size={20} color={NAVBAR_BACKGROUND_COLOR} />
          </View>
        </View>
        {/* 最后一个cell添加last属性，底部的边框就是占满屏幕的 */}
        { this.props.last ? <View style={styles.longBorder} /> : <View style={styles.shotBorder} /> }
      </TouchableOpacity>
    );
  }
}
