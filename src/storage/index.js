/**
  *  数据持久化
  */
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import TAGS from './tags'; // 默认标签

// 创建数据持久化
const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  storageBackend: AsyncStorage,

  // 数据过期时间，1周 , 设置为 null 则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync同步方法，无缝返回最新数据。
  sync: {
    // 标签相关
    Tags(params) {
      const {
        resolve,
      } = params;
      resolve && resolve(TAGS);
    },
  },
});

global.storage = storage;
