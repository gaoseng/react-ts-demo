
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


