
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
// import 'antd/dist/antd.css';
import { Provider } from 'mobx-react';
import store from './store';
import axios from 'axios';
import Mock from 'mockjs';

// import { Hello } from './Hello';
import AppRouter from './routers';
import { any, object } from 'prop-types';

@hot
class App extends React.Component {
  test() {
    Mock.mock('http://localhost:8080/ss', {
    'user|1-3': [{   // 随机生成1到3个数组元素
        name: '@cname',  // 中文名称
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        birthday: '@date("yyyy-MM-dd")',  // 日期
        city: '@city(true)',   // 中国城市
        color: '@color',  // 16进制颜色
        'isMale|1': true,  // 布尔值
        'isFat|1-2': true,  // true的概率是1/3
        // 'fromObj|2': obj,  // 从obj对象中随机获取2个属性
        // 'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'], // 重复2次属性值生成一个新数组
    }]
});
    axios.get('http://localhost:8080/ss').then(res => {
      console.log(res);
    });
    function isObject(value: any) {
      return value !== null && typeof value === 'object';
    }
      }
  render() {
    {
      const x = 0;
      console.log(x);
    }
    this.test();
    return (
      // <div className='main'>
      //   <AppRouter />
      // </div>
      <Provider store={store}><AppRouter /></Provider>
    );
  }
}
// console.log(App);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);





