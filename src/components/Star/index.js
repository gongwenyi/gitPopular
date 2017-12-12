import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { CommonImgs } from './../../theme/images';

export default class Star extends Component {
  /**
   * 设置默认值
   */
  static defaultProps = {
    initResult: 0, // 初始分数
    touchable: false, // 是否可点击
    getResult: () => {}, // 获取分数
    style: {}, // 容器的样式
    starStyle: {}, // 星星的样式
  };

  /**
   * 类型检查
   */
  static propTypes = {
    initResult: PropTypes.number.isRequired,
    touchable: PropTypes.bool,
    getResult: PropTypes.func,
    style: ViewPropTypes.style,
    starStyle: Image.propTypes.style,
  };

  constructor(props) {
    super(props);
    this.state = {
      result: this.props.initResult || 0, // 初始分数
    };
  }

  _renderStars(result) {
    const stars = [];
    if (this.props.touchable) { // 如果是可点击的
      for (let i = 0; i < 5; i++) {
        let starItem = (<TouchableOpacity onPress={() => this._setResult(i + 1)} key={i}><Image source={CommonImgs.star} style={[{ width: 32, height: 32 }, this.props.starStyle]} /></TouchableOpacity>);
        if (i < result) {
          starItem = (<TouchableOpacity onPress={() => this._setResult(i + 1)} key={i}><Image source={CommonImgs.star_selected} style={[{ width: 32, height: 32 }, this.props.starStyle]} /></TouchableOpacity>);
        }
        stars.push(starItem);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        let starItem = (<Image key={i} source={CommonImgs.star} style={[{ width: 32, height: 32 }, this.props.starStyle]} />);
        if (i < result) {
          starItem = (<Image key={i} source={CommonImgs.star_selected} style={[{ width: 32, height: 32 }, this.props.starStyle]} />);
        }
        stars.push(starItem);
      }
    }
    return stars;
  }

  _setResult(result) {
    this.setState({
      result,
    });
    this.props.getResult && this.props.getResult(result); // 将分数传递给父组件
  }

  render() {
    return (
      <View style={[{ flexDirection: 'row' }, this.props.style]}>
        { this._renderStars(this.state.result) }
      </View>
    );
  }
}
