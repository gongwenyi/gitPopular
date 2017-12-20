import React, { Component } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as orderActions from './../../reducers/order/actions';
import GithubTrending from './../../utils/githubTrending';
import RowItem from './rowItem';
import styles from './style';

const GITHUB_URL = 'https://github.com';
const TRENDING_URL = 'https://github.com/trending/';

class TrendingFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [], // 数据列表
      refreshing: false,
    };
    this.path = this.props.path;
    this.since = this.props.since;
    this.GithubTrending = new GithubTrending();
  }

  componentWillMount() {
    console.log('TrendingFlatList====================================');
    console.log(this.props);
    console.log('====================================');
    this._getDataList();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.since !== this.props.since) {
      this.since = nextProps.since;
      this._getDataList();
    }
  }

  async _getDataList() {
    this.setState({ refreshing: true });
    const url = TRENDING_URL + this.path + this.since;
    this.GithubTrending.fetchTrending(url)
      .then((data) => {
        if (data && data.length) {
          console.log('trending====================================');
          console.log(data);
          console.log('====================================');
          this.setState({
            refreshing: false,
            dataList: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          refreshing: false,
          dataList: [],
        });
      });
  }

  // 刷新列表
  _onRefresh() {
    this._getDataList();
  }

  // 渲染每一行数据
  _renderItem(item) {
    return (
      <RowItem key={item.fullName} repository={item} handleItemPress={() => this._handleItemPress(item)} />
    );
  }

  _handleItemPress(item) {
    // console.log(item);
    const { navigate } = this.props.navigation;
    const url = GITHUB_URL + item.url;
    navigate('Repository', { title: item.fullName, url });
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
export default TrendingFlatList;
