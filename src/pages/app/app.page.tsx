import React from 'react';
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
@inject('store')
@observer
export default class App extends React.Component<PropsType, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            a: 1,
            b: 2
        };
    }
    componentDidMount() {
        // console.log(this.props);
        this.props.store.userInfo.username = 'hh';
        // console.log(this.props.store.userInfo);
    }
    btnClk = () => {
        this.setState({a: this.state.a + 1 });
    }
    render() {
        return (<div>
            <p>{this.state.a }</p>
            <Link to={`/login`}>login</Link>
            <button onClick={this.btnClk}> clk me</button>
        </div>);
    }
}
