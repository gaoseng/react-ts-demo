import React from 'react';
import echarts from 'echarts';
import './style.scss';


interface IProps {
    onClick: (params: any) => void;
    title?: object; // 标题
    dataset: {
        dimensions: React.ReactText[]; // 展示的每个维度
        source: object[]
    };
    xAxis: object;
    yAxis: object;
    series: object[];
    style?: object;
    className?: string;
    legend?: object;
    fontColor?: string;
    markLineObj?: {
        average?: number; // 平均值
        max?: number; // 最大值
        min?: number; // 最小值
    };
}
type LineType = 'max' | 'min' | 'average';

export  class CommonChart extends React.PureComponent<IProps> {
    defaultData = {

        title: {
            textStyle: {
                fontSize: '16',
                fontWeight: 700,
                color: '#333',
            },
            left: '10px',
            top: 15,
        },
        legend: {
            type: 'scroll',
            triggerEvent: true,
            textStyle: {
                color: '#333333',
            },
            // top: '5px'
        },
        xAxis: {
            triggerEvent: true,
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#f7f7f8'
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#d5d5d5'
                }
            },
            axisLabel: {
                color: '#333333',

            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    // 使用深浅的间隔色
                    color: '#f7f7f8'
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#d5d5d5'
                }
            },
            axisLabel: {
                color: '#333333'
            }
        },
        markLine: {
            silent: true
        }
    };
    id: string;
    constructor(props: IProps) {
        super(props);
        if (props.fontColor) {
            this.defaultData.title.textStyle.color = props.fontColor;
            this.defaultData.xAxis.axisLabel.color = props.fontColor;
            this.defaultData.yAxis.axisLabel.color = props.fontColor;
            this.defaultData.legend.textStyle.color = props.fontColor;
        }
        if (props.markLineObj) {
            const lineInfo: { yAxis: number | undefined; lineStyle: { color: string; }; }[] = [];
            Object.keys(props.markLineObj).forEach((key: LineType) => {
                if (key === 'max' || key === 'average') {
                    lineInfo.push({
                        yAxis: props.markLineObj && props.markLineObj[key],
                        lineStyle: {
                            color: 'red'
                        }
                    });
                } else {
                    lineInfo.push({
                        yAxis: props.markLineObj && props.markLineObj[key],
                        lineStyle: {
                            color: '#609ee9'
                        }
                    });
                }

            });
            Object.assign(this.defaultData.markLine, {
                data: lineInfo
            });
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
        this.id = this.createRandomId();


    }


    componentDidMount() {
        const {
            title,
            dataset,
            xAxis,
            yAxis,
            series,
            onClick,
            legend

        } = this.props;
        const chartDom: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement;
        const myChart = chartDom && echarts.init(chartDom);
        const option = {
            title: Object.assign(this.defaultData.title, title),
            tooltip: {},
            dataset,
            xAxis: Object.assign(this.defaultData.xAxis, xAxis),
            yAxis: Object.assign(this.defaultData.yAxis, yAxis),
            series,
            legend: Object.assign(this.defaultData.legend, legend),
            grid: {
                // top: 15,
                left: 15,
                right: 25,
                // bottom: 15,
                containLabel: true
            },
            dataZoom: [{
                type: 'inside',
                show: true,
                xAxisIndex: 0
            }],

        };
        if (option.series.length > 0) {
            Object.assign(option.series[0], { markLine: this.defaultData.markLine });
        }
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
        // window.onresize = () => {
        //     // myChart.onresize();
        //     myChart.resize();
        // };
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
        const {  className, style } = this.props;
        return <div id={this.id} className={className} style={style}></div>;
    }
}
