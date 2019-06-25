import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './Hello';

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
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
