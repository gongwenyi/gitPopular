/**
 * 趋势页面
 */
import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from './../../reducers/order/actions';
import RowItem from './rowItem';
import styles from './style';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0, // 当前页
      orderList: [], // 订单列表
      totalPages: 0, // 总页数
      refreshing: false, // 是否刷新中
      statusArray: [2, 3, 0], // 订单状态 2: 进行中 3: 已完成 0: 已取消
      selectStatusIndex: 0, // 选中状态下标
    };

    this.statusNameArray = ['进行中', '已完成', '已取消'];
  }

  componentWillMount() {
    this._onRefresh();
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.refreshing) { // 如果是刷新
      if (nextProps.order.orderList.data && nextProps.order.orderList.data !== this.props.order.orderList.data) {
        const orderList = nextProps.order.orderList.data.data;
        const page = nextProps.order.orderList.data.page;
        this.setState({
          orderList,
          currentPage: page.currentPage,
          totalPages: page.totalPages,
          refreshing: false,
        });
      }
    } else { // 如果是加载更多

    }
  }

  // tab项点击事件
  async _onTabClick(index) {
    if (index !== this.state.selectStatusIndex) {
      await this.setState({ selectStatusIndex: index });
      global.userInfo.token && this._onRefresh();
    }
  }
  // 渲染顶部tabs
  _renderTabs(selectIndex) {
    const tabs = [];
    for (let i = 0; i < 3; i++) {
      if (selectIndex === i) {
        tabs.push(<TouchableOpacity key={i} style={styles.tabActive} onPress={() => this._onTabClick(i)}>
          <Text style={styles.tabText}>{this.statusNameArray[i]}</Text>
        </TouchableOpacity>);
      } else {
        tabs.push(<TouchableOpacity key={i} style={styles.tab} onPress={() => this._onTabClick(i)}>
          <Text style={styles.tabText}>{this.statusNameArray[i]}</Text>
        </TouchableOpacity>);
      }
    }
    return tabs;
  }

  // 刷新列表
  _onRefresh() {
    this.setState({
      currentPage: 0,
      totalPages: 0,
      refreshing: true,
    });
    this.props.actions.getOrderList(0, this.state.statusArray[this.state.selectStatusIndex]);
  }

  // 渲染每一行数据
  _renderItem(item) {
    return <RowItem item={item} onPress={id => this._handleItemPress(id)} />;
  }

  _handleItemPress(id) {
    console.log(id);
  }

  _ListEmptyComponent() {
    return <Text style={styles.empty}>没有数据</Text>;
  }

  // 分隔线
  _ItemSeparatorComponent() {
    return <View style={styles.line} />;
  }

  _ListFooterComponent() {
    const { currentPage, totalPages } = this.state;
    if (currentPage === 0 && totalPages === 0) {
      return null;
    } else if (currentPage + 1 === totalPages) {
      return <View style={styles.noMoreView}><Text style={styles.noMoreText}>我是有底线的~</Text></View>;
    }
    return (<ActivityIndicator
      animating
      size="large"
    />);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.tabs}>
          {/* <TouchableOpacity style={styles.tabActive} onPress={() => this._onTabClick(0)}>
            <Text style={styles.tabText}>进行中</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => this._onTabClick(1)}>
            <Text style={styles.tabText}>已完成</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => this._onTabClick(2)}>
            <Text style={styles.tabText}>已取消</Text>
          </TouchableOpacity> */}
          { this._renderTabs(this.state.selectStatusIndex) }
        </View>
        <FlatList
          data={this.state.orderList}
          renderItem={({ item }) => this._renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh()}
          onEndReached={() => {}}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => this._ListEmptyComponent()}
          ItemSeparatorComponent={() => this._ItemSeparatorComponent()}
          ListFooterComponent={() => this._ListFooterComponent()}
        />
      </View>
    );
  }
}
export default connect(
  state => ({
    nav: state.nav,
    order: state.order,
  }),
  dispatch => ({
    actions: bindActionCreators(orderActions, dispatch),
  }),
)(Shop);
