import React from 'react';
import Axios from 'axios';



export class ChinaMap extends React.PureComponent {

    constructor(props: Readonly<{}>) {
        super(props);
    }

    componentDidMount() {
        this.initData();
    }

    async initData() {
        const mapJson = await Axios.get('static/map/china.map');
    }
}
