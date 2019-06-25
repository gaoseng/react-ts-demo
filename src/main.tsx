import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.css';
import './main.scss';

import { Hello } from './Hello';

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
      <div><Hello compiler='TypeScript' framework='React' /></div>
    );
  }
}
console.log (App);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
