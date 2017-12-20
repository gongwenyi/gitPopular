import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import styles from './style';

const stylesss = StyleSheet.create({
  p: {
    paddingVertical: 10,
    fontSize: 14,
    color: '#666',
  },
  a: {
    fontWeight: '300',
    color: '#444', // make links coloured pink
  },
});

// 渲染每一行数据
const RowItem = (props) => {
  const { repository,  handleItemPress} = props;
  const htmlContent = `<p>${repository.description}</p>`;
  return (
    <TouchableOpacity key={repository.fullName} style={styles.item} onPress={() => handleItemPress()}>
      <Text style={styles.title}>{repository.fullName}</Text>
      {/* <Text style={styles.desc}>{repository.description}</Text> */}
      <HTMLView
        value={htmlContent}
        stylesheet={stylesss}
      />
      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomText}>Built by:  </Text>
          {
            repository.contributors.map(item => <View key={item} style={styles.avatarContainer}><Image source={{ uri: item }} style={styles.avatar} /></View>)
          }
        </View>
        <Text style={styles.bottomText}>{repository.meta}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default RowItem;
