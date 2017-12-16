import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from './style';

// 渲染每一行数据
const RowItem = (props) => {
  const { repository,  handleItemPress} = props;
  return (
    <TouchableOpacity key={repository.id} style={styles.item} onPress={() => handleItemPress()}>
      <Text style={styles.title}>{repository.full_name}</Text>
      <Text style={styles.desc}>{repository.description}</Text>
      <View style={styles.bottom}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomText}>Author:  </Text>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: repository.owner.avatar_url }} style={styles.avatar} />
          </View>
        </View>
        <Text style={styles.bottomText}>Stars:  {repository.stargazers_count}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default RowItem;
