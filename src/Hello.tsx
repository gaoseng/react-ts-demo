import * as React from 'react';
import { Button } from 'antd';

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>
            Hello from {this.props.compiler} and {this.props.framework}!
            <Button type='primary'>Primary</Button>
            </h1>;
    }
}
