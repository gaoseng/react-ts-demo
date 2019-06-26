import React from 'react';
import { Link } from 'react-router-dom';
import { observer,  inject } from 'mobx-react';


interface PropsType {
    store: {
        userInfo: {
            username: string
        }
    };
}
@inject('store')
@observer
export default class App extends React.Component<PropsType, {}> {

    componentDidMount() {
        console.log(this.props);
        this.props.store.userInfo.username = 'hh';
        console.log(this.props.store.userInfo);
    }
    render() {
        return (<div>
            123
            <Link to={`/login`}>login</Link>
        </div>);
    }
}
