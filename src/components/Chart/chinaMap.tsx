import React from 'react';
import Axios from 'axios';
import echarts, { ECharts } from 'echarts';
import './style.scss';
import ProvinceJson from './provinceJson';
import CityJson from './cityJson'; 

interface IProps {
    data: { name: string, value: number }[];
    name: string;  // 地图类型 china 省份 市；
    min: number;
    max: number;
    onClick?: (param: object) => void;
    style?: object;
    className?: string;
}

export class ChinaMap extends React.PureComponent<IProps> {
    id: string;
    provinceJson: {
        [key: string]: string;
    } = ProvinceJson;
    cityJson: {
        [key: string]: string;
    } = CityJson;
    defautData = {
        tooltip: {
            // trigger: 'item',
            formatter: (param: { name: any; value: number; }) => {
                return `${param.name} ${isNaN(param.value) ? '' : ': ' + param.value}`;
            }
        },
        visualMap: [{
            min: 0,
            max: 0,
            text: ['High', 'Low'],
            seriesIndex: [0],
            realtime: true,   // 拖拽时是否时时刷新
            calculable: true, // 是否显示拖住用的手柄
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            },
            textStyle: {
                color: 'lime'
            }
        }],
        geo: {
            map: 'china',
            roam: true,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: 'rgba(0,0,0,0.4)'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [

            {
                name: 'categoryA',
                type: 'map',
                geoIndex: 0,
                roam: true,
                // tooltip: {show: false},
                // data: object[]
            }
        ]
    };

    constructor(props: IProps) {
        super(props);
        this.id = this.createRandomId();
    }

    async componentDidMount() {
        const {min, max, data, name}  = this.props;
        this.defautData.visualMap[0].min = min;
        this.defautData.visualMap[0].max = max;
        this.defautData.geo.map = name;
        Object.assign(this.defautData.series[0], {data});
        
        let mapChart: ECharts| null = null;
        // switch (this.props.name) {
        //     case 'china':
        //         mapChart = await this.initChinaMap();
        //         break;
        //     case ''

        // }
        
        if ( name === 'china') {
            mapChart = await this.initChinaMap();

        } else if (/.*省$/.test(`${name}`) || this.provinceJson[name]) {
            mapChart = await this.initProvinceMap();
        } else {
            mapChart = await this.initCityMap();
        }
        
        mapChart && mapChart.on('click', (params: object & {value: number}) => {
            // onClick(params);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                // debugger;
                this.handleMbTooltip(params);
            } else {
                this.props.onClick && this.props.onClick(params);
            }


        });
       
        window.addEventListener('resize', () => {
            mapChart && mapChart.resize();
        });
        window.addEventListener('orientationchange', () => {
            mapChart && mapChart.resize();
        }, false);
    }

    async initChinaMap() {
        const chinaMapData = await Axios.get('static/map/china.json');
        const mapJson = chinaMapData.data;
        const chartDom = document.getElementById(this.id) as HTMLDivElement;
        const chinaMap = echarts.init(chartDom);
        echarts.registerMap('china', mapJson);

        
        chinaMap.setOption(this.defautData);
        return chinaMap;


    }

    async initProvinceMap() {
        const {name} = this.props;
        const provinceNameCn = /.*省$/.test(`${name}`) ? name.slice(0, (name.length - 1)) : name;
        const provinceName = this.provinceJson[provinceNameCn];

        const provinceMapData = await Axios.get(`static/map/province/${provinceName}.json`);
        const provinceMapJson = provinceMapData.data;
        const chartDom = document.getElementById(this.id) as HTMLDivElement;
        const provinceMap = echarts.init(chartDom);
        echarts.registerMap(provinceName, provinceMapJson);

        this.defautData.geo.map = provinceName;
        provinceMap.setOption(this.defautData);
        return provinceMap;
    }

    async initCityMap() {
        const {name} = this.props;
        const cityNameCn = /.*市$/.test(`${name}`) ? name : name + '市';
        const cityName = this.cityJson[cityNameCn];
        const cityMapData = await Axios.get(`static/map/citys/${cityName}.json`);
        const cityMapJson = cityMapData.data;

        const chartDom = document.getElementById(this.id) as HTMLDivElement;
        const cityMap = echarts.init(chartDom);
        echarts.registerMap(cityName, cityMapJson);

        this.defautData.geo.map = cityName;
        cityMap.setOption(this.defautData);
        return cityMap;
    }

    createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '-'
            + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    }
    handleMbTooltip(param: object & {value: number}) {
        const tooltipEleParent: HTMLElement | null = document.getElementById(this.id);
        if ( !isNaN(param.value) && tooltipEleParent && tooltipEleParent.children.length >= 2) {
            tooltipEleParent.children[1].className = 'tooltip';

            // tooltipEle.className = 'tooltip';

            const tooltipEle: HTMLElement | null = tooltipEleParent.querySelector('.tooltip');
            if (tooltipEle) {
                const footer = document.createElement('footer');
                footer.textContent = 'link>>';
                tooltipEle.appendChild(footer);
                footer.className = 'tooltip-footer';
                tooltipEle.onclick = (e) => {
                    this.props.onClick && this.props.onClick(param);
                };
            }

        }

    }
    render() {
        const { style, className } = this.props;
        return (<div id={this.id} style={style} className={className}>123</div>);
    }
}
