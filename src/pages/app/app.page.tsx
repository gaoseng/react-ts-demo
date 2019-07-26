import React, { Ref, RefObject, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { observer,  inject } from 'mobx-react';
import { Store } from '@/store';


interface PropsType {
    store: Store;
}

interface IState {
    a: number;
    b: number;
}

class Child extends React.Component<{content: string}, {}> {
    render() {
        console.log(this.props.children);
        return (<div>123</div>);
    }
}

class IndexPage extends PureComponent<{}, {}> {
    state = {
        arr: ['1']
      };
    constructor(props: Readonly<{}>) {
      super(props);
      console.log('constructor');
    }
    changeState = () => {
      const { arr } = this.state;
      arr.pop();
      arr.push('2');
      console.log(arr);
      // ["1", "2"]
      //  ["1", "2", "2"]
      //  ["1", "2", "2", "2"]
      // ....
      this.setState({
        arr
      });
    }
    render() {
      console.log(1);
      const x = 2;
      console.log('render');
      return (
        <div>
          <button onClick={this.changeState}>点击</button>
          <div>
            {this.state.arr.map((item) => {
              return item;
            })}
          </div>
        </div>
      );
    }
  }

@inject('store')
@observer
export default class App extends React.Component<PropsType, IState> {
    myRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            a: 1,
            b: 2
        };
        this.myRef = React.createRef();
        console.log(React);
    }
    componentDidMount() {
        // console.log(this.props);
        this.props.store.userInfo.username = 'hh';
        // console.log(this.props.store.userInfo);
        // console.log(this.myRef);
    }
    btnClk = () => {
        this.setState({a: this.state.a + 1 });
    }
    render() {
        return (<div>
            <IndexPage />
        </div>);
    }
}




