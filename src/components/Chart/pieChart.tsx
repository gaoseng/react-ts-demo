import React from 'react';
import echarts from 'echarts';
import './style.scss';



interface IProps {
    onClick: (params: any) => void;
    title?: object; // 标题
    dataset: {
        dimensions: React.ReactText[]; // 展示的每个维度
        source: any[]
    };
    series?: object[];
    style?: object;
    className?: string;
    legend?: object;
    fontColor?: string;
}
interface DefaultSeriesType {
    type: string;
    radius: number | string;
    center: string[];
    label: {
        normal: {
            formatter: (params: any) => string;
        }
    };

}


export class PieChart extends React.PureComponent<IProps> {
    color = ['#609ee9', '#f7ba2a', '#39ca74', '#fc90a6',
        '#bbadf3', '#48bfe3', '#fca786', '#fe94ea', '#86e1fc',
        '#496169', '#fa4166', '#39ca74', '#fc90a6', '#bbadf3', '#48bfe3', '#fca786', '#fe94ea', '#86e1fc'];
    defaultData = {

        title: {
            textStyle: {
                fontSize: '14',
                // fontWeight: 400,
                color: '#333',
            },
            left: '10px',
            top: 15,
        },
        legend: {
            type: 'scroll',
            // triggerEvent: true,
            // right: '10px',
            orient: 'horizontal',
            textStyle: {
                color: '#333333',
            },
            // top: '5px'
        },
        series: [],
        color: this.color
    };
    id: string;
    constructor(props: IProps) {
        super(props);
        if (props.fontColor) {
            this.defaultData.title.textStyle.color = props.fontColor;
            this.defaultData.legend.textStyle.color = props.fontColor;
        }


        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            Object.assign(this.defaultData.legend, {
                bottom: '5px'
            });
        } else {
            Object.assign(this.defaultData.legend, {
                top: '5px'
            });
        }
        // this.pieSeriesPc();
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            // debugger;
            this.pieSeriesMb();
            Object.assign(this.defaultData.legend, {
               orient: 'horizontal',
               bottom: '5px'
            });
        } else {
            this.pieSeriesPc();
        }
        this.id = this.createRandomId();


    }


    componentDidMount() {
        const {
            title,
            dataset,
            series,
            onClick,
            legend

        } = this.props;
        const chartDom: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;
        const myChart =  echarts.init(chartDom);
        const seriesData = Object.assign(this.defaultData.series, series);
        const option = {
            title: Object.assign(this.defaultData.title, title),
            tooltip: {},
            dataset,
            series: seriesData,
            legend: Object.assign(this.defaultData.legend, legend),
            color: this.color,

        };
        
        myChart.setOption(option);
        myChart.on('click', (params: object) => {
            // onClick(params);
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                // debugger;
                this.handleMbTooltip(params);
            } else {
                onClick && onClick(params);
            }


        });
        window.addEventListener('resize', () => {
            myChart && myChart.resize();
        });
        window.addEventListener('orientationchange', () => {
            myChart.resize();
        }, false);

    }
    createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '-'
            + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    }

    pieSeriesPc() {
        const series: DefaultSeriesType[] = [];
        const len = this.props.dataset.dimensions.length - 1;
        let xAxis: string;
        let yAxis = '50%';
        let radius: string | number = 60;
        const h = Math.ceil(len / 3);
        for (let i = 0; i < len; i++) {
            if (len >= 3) {
                const redidue = i % 3;
                xAxis = (25 + redidue * 25) + '%';
            } else if (len === 2) {
                xAxis = 35 * (i + 1) + '%';
                yAxis = 50 + '%';
            } else {
                yAxis = 50 + '%';
                xAxis = 50 + '%';
            }
            if (len > 3) {
                yAxis = (50 / h) + (100 / h) * Math.floor(i / 3) + '%';
                radius = 50 / h + '%';
            }
            series.push({
                type: 'pie',
                radius,
                center: [xAxis, yAxis],
                label: {
                    normal: {
                        formatter: (params: any) => {
                            const value = Object.keys(params.data)[params.seriesIndex];
                            return `${params.name}\n${value}: ${params.percent}%`;
                        }
                    },
                },

            });
        }
        Object.assign(this.defaultData, { series });
    }
    pieSeriesMb() {
        const series: DefaultSeriesType[] = [];
        const len = this.props.dataset.dimensions.length - 1;
        const xAxis = '50%';
        let yAxis = '50%';
        const radius = 50 / len + '%';
        for (let i = 0; i < len; i++) {
            yAxis = (50 / len)  + (100 / len) * i  + '%';

            series.push({
                type: 'pie',
                radius,
                center: [xAxis, yAxis],
                label: {
                    normal: {
                        formatter: (params: any) => {
                            const value = Object.keys(params.data)[params.seriesIndex];
                            return `${params.name}\n${value}: ${params.percent}%`;
                        }
                    },
                },

            });
        }
        Object.assign(this.defaultData, { series });
    }

    /**
     * 移动端点击提示事件；
     */
    handleMbTooltip(param: object) {
        const tooltipEleParent: HTMLElement | null = document.getElementById(this.id);

        if (tooltipEleParent && tooltipEleParent.children.length >= 2) {
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
        const { className, style } = this.props;
        return <div id={this.id} className={className} style={style}></div>;
    }
}
