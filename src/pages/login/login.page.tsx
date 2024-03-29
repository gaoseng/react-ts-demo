import React from 'react';
import { observer, inject } from 'mobx-react';

interface PropsType {
    store: {
        userInfo: {
            username: string
        }
    };
    txt: string;
}
interface X {
    t: string;
}

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

const ThemeContext = React.createContext(
    themes.dark // 默认值
);
class ThemeButton extends React.Component<{}, {}> {
    render() {
        const props = this.props;
        // tslint:disable-next-line: deprecation
        const theme = this.context;
        console.log(theme);
        return (
            <button
                {...props}
                style={{backgroundColor: theme.background}}
            ></button>
        );
    }
}
ThemeButton.contextType = ThemeContext;


@inject('store')
@observer
export default class Login extends React.Component<PropsType, {}> {
    render() {
        return (<div>
            <ThemeButton />
        </div>);
    }
}






