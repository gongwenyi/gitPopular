/**
 * 自定义标签页
 */
import React, { Component } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as popularActions from './../../reducers/popular/actions';
import styles from './style';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import { NavBar } from './../../components';

class CustomKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [], // 所有标签
    };
  }

  async componentWillMount() {
    console.log('====================================');
    console.log(global.tags);
    console.log('====================================');
    // 从global中获取所有的标签
    const tags = JSON.parse(JSON.stringify(global.tags));
    this.setState({ tags });
    this.currentTags = JSON.parse(JSON.stringify(global.tags)); // 记录用户编辑前的标签
    this.editTags = JSON.parse(JSON.stringify(global.tags)); // 记录用户编辑后的标签
  }

  componentDidMount() {

  }

  // 返回按钮事件
  _onBack() {
    console.log('====================================');
    console.log(this.currentTags);
    console.log(this.editTags);
    console.log('====================================');
    const { goBack } = this.props.navigation;
    if (this._checkChange()) {
      Alert.alert(
        '提示',
        '您已修改标签，确定要放弃本次修改吗？',
        [
          { text: '放弃', onPress: () => goBack() },
          { text: '保存', onPress: () => this._onSave() },
        ],
        { cancelable: false },
      );
    } else {
      goBack();
    }
  }

  // 检查用户是否有修改标签
  _checkChange() {
    for (let i = 0, len = this.currentTags.length; i < len; i += 1) {
      if (this.currentTags[i].checked !== this.editTags[i].checked) { // 遍历用户是否有修改标签
        return true;
      }
    }
    return false;
  }

  // 保存按钮事件
  _onSave() {
    global.storage.save({
      key: 'Tags', // 不要在key中使用下划线_
      data: this.editTags,
      // if not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
    global.tags = this.editTags;

    this.props.popularAction.updatePopularTags(); // 更新标签列表

    const { goBack } = this.props.navigation;
    goBack();
  }

  // 单选框点击事件
  _onClick(data, index) {
    data.checked = !data.checked;
    this.editTags[index] = data;
  }

  _renderTagsView() {
    if (!this.state.tags || this.state.tags.length === 0) return;
    const views = [];
    for (let i = 0, len = this.state.tags.length; i < len; i += 2) {
      views.push(
        <View key={i} style={styles.row}>
          <View style={styles.item}>
            {this._renderCheckBox(this.state.tags[i], i)}
          </View>
          <View style={styles.item}>
            {this.state.tags[i + 1] && this._renderCheckBox(this.state.tags[i + 1], i + 1)}
          </View>
        </View>
      );
    }
    return views;
  }

  // 渲染多选框
  _renderCheckBox(data, index) {
    const { name, checked } = data;
    return (
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        onClick={() => this._onClick(data, index)}
        isChecked={checked}
        checkBoxColor={NAVBAR_BACKGROUND_COLOR}
        leftText={name}
      />);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          title="自定义标签"
          backBtnClick={() => this._onBack()}
          rightBtnText="保存"
          rightBtnTextClick={() => this._onSave()}
        />
        <ScrollView>
          {this._renderTagsView()}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => ({
    popularAction: bindActionCreators(popularActions, dispatch),
  }),
)(CustomKey);
