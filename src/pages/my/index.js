/**
 * 我的页面
 */
import React, { Component } from 'react';
import { StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import styles from './style';
import { NAVBAR_BACKGROUND_COLOR } from './../../theme/color';
import { NavBar, Cell, Toast } from './../../components';

class Member extends Component {
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

  _handlePress(name) {
    const { navigate } = this.props.navigation;
    navigate(name);
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <NavBar
          hideBackBtn
          title="My"
        />
        <ScrollView>
          <Cell
            onPress={() => this._handlePress('CustomKey')}
            leftIcon={<Icon name="md-pricetag" size={22} color={NAVBAR_BACKGROUND_COLOR} />}
            leftLabel="自定义标签"
          />
          <Cell
            onPress={() => this._handlePress('SortKey')}
            leftIcon={<IconFontAwesome name="random" size={18} color={NAVBAR_BACKGROUND_COLOR} />}
            leftLabel="标签排序"
          />
          {/* <Cell
            onPress={() => this._handlePress('DropDown')}
            leftIcon={<IconFontAwesome name="random" size={18} color={NAVBAR_BACKGROUND_COLOR} />}
            leftLabel="dropdown"
          /> */}
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
    dispatch,
  }),
)(Member);
