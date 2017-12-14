/**
 * 收藏页面
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

    };

  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text>待进行</Text>
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
