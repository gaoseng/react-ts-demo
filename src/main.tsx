import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';

// import { Hello } from './Hello';
import AppRouter from './routers';

@hot
class App extends React.Component {
  test() {
    const i = 1;
    const j = 2;
    const x = () => {
      console.log(123);
      return 1;
    };
    x();
  }
  render() {
    this.test();
    return (
      <div className='main'>
        <AppRouter />
      </div>
    );
  }
}
console.log (App);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
