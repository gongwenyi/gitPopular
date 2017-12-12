import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from './style';

export default function RowItem(props) {
  const { item, onPress } = props;
  const avatar = { uri: `${item.userInfo.userAvatar}!w150` };
  return (<TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => onPress(item.id)}>
    <View style={styles.itemLeft}>
      <Image source={avatar} style={styles.avatar} />
    </View>
    <View style={styles.itemCenter}>
      <Text style={styles.nickName}>{ item.userInfo.nickName }</Text>
      <Text style={styles.description}>{ item.description }</Text>
    </View>
    <View style={styles.itemRight}>
      <Text style={styles.price}>{ item.price }</Text>
    </View>
  </TouchableOpacity>);
}
