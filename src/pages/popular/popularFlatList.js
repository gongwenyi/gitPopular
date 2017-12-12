import React, { Component } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as orderActions from './../../reducers/order/actions';
import ApiService from './../../api';
import styles from './style';

class PopularFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [], // 数据列表
      refreshing: false,
    };
    this.path = this.props.path;
  }

  componentWillMount() {
    console.log('popularFlatList====================================');
    console.log(this.props);
    console.log('====================================');
    this._getDataList();
  }

  componentDidMount() {

  }

  async _getDataList() {
    this.setState({ refreshing: true });
    const data = await ApiService.Popular.getPopularList(this.path);
    if (data.items && data.items.length) {
      this.setState({
        refreshing: false,
        dataList: data.items,
      });
    }
  }

  // 刷新列表
  _onRefresh() {
    this._getDataList();
  }

  // 渲染每一行数据
  _renderItem(item) {
    return (
      <TouchableOpacity key={item.id} style={styles.item} onPress={() => this._handleItemPress(item)}>
        <Text style={styles.title}>{item.full_name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <View style={styles.bottom}>
          <View style={styles.bottomItem}>
            <Text style={styles.bottomText}>Author:  </Text>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
            </View>
          </View>
          <Text style={styles.bottomText}>Stars:  {item.stargazers_count}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _handleItemPress(item) {
    // console.log(item);
    const { navigate } = this.props.navigation;
    navigate('Repository', { title: item.full_name, url: item.html_url });
  }

  _ListEmptyComponent() {
    if (this.state.refreshing) {
      return null;
    }
    return <Text style={styles.empty}>没有数据</Text>;
  }

  // 分隔线
  _ItemSeparatorComponent() {
    return <View style={styles.line} />;
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <FlatList
          data={this.state.dataList}
          renderItem={({ item }) => this._renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh()}
          onEndReached={() => {}}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => this._ListEmptyComponent()}
          ItemSeparatorComponent={() => this._ItemSeparatorComponent()}
        />
      </View>
    );
  }
}
export default PopularFlatList;
