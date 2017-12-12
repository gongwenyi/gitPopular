import React from 'react';
import {
  Modal,
  ActivityIndicator,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

const TOP = Platform.OS === 'ios' ? 60 : 40;

const styles = StyleSheet.create({
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootViewContainer: {
    position: 'absolute',
    top: TOP,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 15,
    backgroundColor: '#0009',
    borderRadius: 8,
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
  },
});

const Loading = (props) => {
  const {
    modal = false, // modal:true loading显示在Modal中，导航栏和Tabbar都不可点击  默认显示在View中
    loadingText = '', // loading中显示的文字
    modalViewContainerStyle = {}, // Modal中最外层View的样式
    rootViewContainerStyle = {}, // loading最外层View的样式
    loadingContainerStyle = {}, // loading容器的样式
    loadingTextStyle = {}, // loading中文字的样式
  } = props;

  if (modal) {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={() => {}}
      >
        <View style={[styles.modalViewContainer, modalViewContainerStyle]}>
          <View style={[styles.loadingContainer, loadingContainerStyle]}>
            <ActivityIndicator
              animating
              size="large"
              color="#fff"
            />
            { loadingText ? <Text style={[styles.loadingText, loadingTextStyle]}>{loadingText}</Text> : null }
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View style={[styles.rootViewContainer, rootViewContainerStyle]}>
      <View style={[styles.loadingContainer, loadingContainerStyle]}>
        <ActivityIndicator
          animating
          size="large"
          color="#fff"
        />
        { loadingText ? <Text style={[styles.loadingText, loadingTextStyle]}>{loadingText}</Text> : null }
      </View>
    </View>
  );
};

export default Loading;
