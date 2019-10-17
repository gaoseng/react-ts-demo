import React, { Context } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Store } from '@/store';
import './app.page.scss';
import { Button } from 'antd';
import { LongPress } from '@/utils';


interface PropsType {
  store: Store;
}

interface IState {
  data: object[];
}

// function Test() {
//   return {
//     a: 'x'
//   };
// }

// let x: typeof Test = () => ({
//   a: '2'
// });

// let y = 2;
interface MouseProps {
  children: (param: MouseState) => JSX.Element;
}
interface MouseState {
  x: number;
  y: number;
}
class Mouse extends React.Component<MouseProps, MouseState> {
  state = { x: 0, y: 0 };


  handleMouseMove = (event: any) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  renderItem() {
    return React.createElement('div', 1, () => {

    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}



const ThemeContext = React.createContext('light');

type Text = typeof ThemeContext;


console.log(Text);
@inject('store')
@observer
export default class App extends React.Component<PropsType, IState> {
  state = {
    data: [{
      key: 'china',
      value: '中国'
    }, {
      key: 'jpan',
      value: '日本'
    }
    ]
  };
  componentDidMount() {
    const ele: HTMLDivElement = document.getElementById('main') as HTMLDivElement;

  }
  render() {
    return (<div className='active-replace'>
      <Link to='/login' >124</Link>
      <Button type='primary' {...LongPress((e) => {
        console.log(e);
      })}>press event</Button>
      
      {/* <Mouse >
        {
          (state) => {
            console.log(state);
            return <div>123</div>;
          }
        }
      </Mouse> */}
    </div>);
  }
}













