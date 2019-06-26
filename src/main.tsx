import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import { Provider } from 'mobx-react';
import store from './store';

// import { Hello } from './Hello';
import AppRouter from './routers';

@hot
class App extends React.Component {
  test() {
    console.log(store);
  }
  render() {
    this.test();
    return (
      // <div className='main'>
      //   <AppRouter />
      // </div>
      <Provider store={store}><AppRouter /></Provider>
    );
  }
}
console.log (App);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
