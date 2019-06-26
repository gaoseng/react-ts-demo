import React from 'react';
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

export default class Login extends React.Component<PropsType, {}> {
    componentDidMount() {
        console.log(this.props.store.userInfo);
    }
    render() {
        return (<div>login</div>);
    }
}
