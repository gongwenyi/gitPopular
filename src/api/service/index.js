import Axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { Toast } from './../../components';

const BASE_URL = 'https://api.github.com/';

// 创建Axios实例
const service = Axios.create({
  baseURL: BASE_URL, // api的base_url
  timeout: 60000, // 请求超时时间
});

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 拦截每一次请求, 在请求发送之前做一些操作
service.interceptors.request.use(async (config) => {
  // 添加token验证
  // 从 global.userInfo 中获取，如果没有取到，再尝试从 global.storage 中获取
  // let AUTH_TOKEN = global.userInfo.token || '';
  // if (!AUTH_TOKEN) {
  //   const userInfo = await global.storage.load({ key: 'UserInfo' });
  //   AUTH_TOKEN = userInfo.token;
  // }
  // config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;

  // 添加subTime
  // Object.assign(config.params, { subtime: Date.now() });
  // console.log('config=');
  // console.log(config);
  console.log('-----request url:', config.url);
  console.log('-----request data:', config.data);
  console.log('-----request params:', config.params);
  return config;
}, error => Promise.reject(error));

// 拦截每一次请求返回结果，并对结果进行处理
service.interceptors.response.use((response) => {
  console.log('-----response:', response.data);

  // 获取后台返回的json数据
  return response.data;
}, (error) => {
  console.log('-----error.response:', error.response);

  const response = error.response;

  if (response.status === 400) {
    if (typeof response.data === 'string') {
      Toast.showShotCenter(response.data);
    } else {
      Toast.showShotCenter(response.data.message);
    }
  }

  if (response.status === 401) { // 未登录后台返回401
    console.log('用户未登录');
    global.store.dispatch(NavigationActions.navigate({ routeName: 'Login' }));
  }

  return Promise.reject(error);
});

// 导出post和get请求方法
export function post(url, params) {
  return service.post(url, params);
}

export function get(url, params) {
  return service.get(url, {
    params,
  });
}
