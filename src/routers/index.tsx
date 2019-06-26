import React from 'react';
import {  Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import {
    App,
    Login
} from '@/pages';

export default class RouterConfig extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={App} exact />
                    <Route path='/login' component={Login} />
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>

        );
    }
}

