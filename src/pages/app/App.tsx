import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component<{}, {}> {
    render() {
        return (<div>
            123
            <Link to={`/login`}>login</Link>
        </div>);
    }
}
