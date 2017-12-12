import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as popularActions from './../../reducers/popular/actions';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import { NavBar } from './../../components';
import styles from './style';

class SortKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedTags: [], // 用户订阅的标签数组
    };
  }

  componentWillMount() {
    // 从global中获取所有的标签
    this.tags = JSON.parse(JSON.stringify(global.tags));
    this._getCheckedTags(this.tags);
    // this.currentTags = JSON.parse(JSON.stringify(global.tags)); // 记录用户编辑前的标签
    // this.editTags = JSON.parse(JSON.stringify(global.tags)); // 记录用户编辑后的标签
  }

  // 获取用户订阅的标签
  _getCheckedTags(tags) {
    const checkedTags = [];
    tags.map((item) => {
      if (item.checked) {
        checkedTags.push(item);
      }
    });
    this.setState({ checkedTags });
    this.currentCheckedTags = JSON.parse(JSON.stringify(checkedTags)); // 记录用户排序前的已订阅标签列表
  }

  // 获取排序后的标签列表
  _getSortTags() {
    this.sortTags = JSON.parse(JSON.stringify(global.tags)); // 排序后的标签列表
    console.log('====================================');
    console.log(this.currentCheckedTags);
    console.log(this.state.checkedTags);
    console.log('====================================');
    for (let i = 0; i < this.currentCheckedTags.length; i += 1) {
      const item = this.currentCheckedTags[i];
      const index = this._getArrayItemIndex(item, this.tags); // 排序前在标签列表中的位置
      this.sortTags.splice(index, 1, this.state.checkedTags[i]); // 修改为排序后的值
    }
    console.log('====================================');
    console.log(this.sortTags);
    console.log('====================================');
  }

  // 获取数组中元素的位置
  _getArrayItemIndex(item, arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].name === item.name) {
        return i;
      }
    }
    return -1;
  }

  // 渲染排序列表项
  _renderRow(item) {
    return (
      <TouchableHighlight
        key={item.name}
        underlayColor="#eee"
        {...this.props.sortHandlers}
      >
        <View style={styles.row}>
          <Icon name="ios-menu" size={22} color={NAVBAR_BACKGROUND_COLOR} />
          <Text style={styles.rowText}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  // 返回按钮事件
  _onBack() {
    this._getSortTags();
    console.log('====================================');
    console.log(this.tags);
    console.log(this.sortTags);
    console.log('====================================');
    const { goBack } = this.props.navigation;
    if (this._checkChange()) {
      Alert.alert(
        '提示',
        '您已修改标签顺序，确定要放弃本次修改吗？',
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
    for (let i = 0, len = this.tags.length; i < len; i += 1) {
      if (this.tags[i].name !== this.sortTags[i].name) { // 遍历用户是否有修改标签
        return true;
      }
    }
    return false;
  }

  // 保存按钮事件
  _onSave() {
    this._getSortTags();
    global.storage.save({
      key: 'Tags', // 不要在key中使用下划线_
      data: this.sortTags,
      // if not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
    global.tags = this.sortTags;

    this.props.popularAction.updatePopularTags(); // 更新标签列表

    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          title="标签排序"
          backBtnClick={() => this._onBack()}
          rightBtnText="保存"
          rightBtnTextClick={() => this._onSave()}
        />
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedTags}
          order={Object.keys(this.state.checkedTags)}
          onRowMoved={(e) => {
            this.state.checkedTags.splice(e.to, 0, this.state.checkedTags.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={item => this._renderRow(item)}
        />
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
)(SortKey);
