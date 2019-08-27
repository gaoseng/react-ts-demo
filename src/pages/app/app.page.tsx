import React, { Ref, RefObject, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Store } from '@/store';
import BarChart from '@/components/Chart/barChart';
import { PieChart } from '@/components/Chart/pieChart';


interface PropsType {
  store: Store;
}

interface IState {
  a: number;
  b: number;
}
const color = ['#609ee9', '#f7ba2a', '#39ca74', '#fc90a6', 
  '#bbadf3', '#48bfe3', '#fca786', '#fe94ea', '#86e1fc', 
  '#496169', '#fa4166', '#39ca74', '#fc90a6', '#bbadf3', '#48bfe3', '#fca786', '#fe94ea', '#86e1fc'];

class Child extends React.Component<{ content: string }, {}> {
  render() {
    console.log(this.props.children);
    return (<div>123</div>);
  }
}

class IndexPage extends PureComponent<{}, {}> {
  state = {
    arr: ['1']
  };
  constructor(props: Readonly<{}>) {
    super(props);
    console.log('constructor');
  }
  changeState = () => {
    const { arr } = this.state;
    arr.pop();
    arr.push('2');
    console.log(arr);
    // ["1", "2"]
    //  ["1", "2", "2"]
    //  ["1", "2", "2", "2"]
    // ....
    this.setState({
      arr
    });
  }
  render() {
    console.log(1);
    const x = 2;
    console.log('render');
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>
          {this.state.arr.map((item) => {
            return item;
          })}
        </div>
      </div>
    );
  }
}

@inject('store')
@observer
export default class App extends React.Component<PropsType, IState> {
  myRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      a: 1,
      b: 2
    };
    this.myRef = React.createRef();
    console.log(React);
  }
  componentDidMount() {
    // console.log(this.props);
    this.props.store.userInfo.username = 'hh';
    // console.log(this.props.store.userInfo);
    // console.log(this.myRef);
  }
  btnClk = () => {
    this.setState({ a: this.state.a + 1 });
  }
  chartClk = (param: any) => {
    console.log(param);
  }
  render() {
    const dataset = {
      dimensions: ['product', '2015', '2016', '2017', '2018'],
      source: [
        { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7, 2018: 93.7  },
        { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1, 2018: 13.7  },
        { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5, 2018: 43.7  },
        { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1, 2018: 73.7  }
      ]
    };
    const xAxis = { type: 'category' };
    const yAxis = {};
    const series = [
      {
        type: 'bar', 
        barMaxWidth: '30%', 
        smooth: true,
        symbol: 'circle',
        symbolSize: 15,
        color: color[0],
      //   symbolSize(data: any) {
      //     // debugger;
      //     return 10 * 3 ;
      // },
      },
      {
        type: 'bar', 
        barMaxWidth: '30%', 
        smooth: true,
        symbol: 'circle',
        symbolSize: 15,
        color: color[1]
      },
      {
        type: 'bar', 
        barMaxWidth: '30%', 
        smooth: true,
        symbol: 'circle',
        symbolSize: 15,
        color: color[2]
      },
    ];

    return (<div >
      {/* <IndexPage />
      <div id='id'></div> */}
      <PieChart
        dataset={dataset}
        // series={seriesPie}
        onClick={this.chartClk}
        style={{ width: '100%', height: '500px'}}
        title={
          { text: '本业经营情况' }
        }
        // fontColor='white'
      />
      {/* <BarChart
        dataset={dataset}
        xAxis={xAxis}
        yAxis={yAxis}
        series={series}
        onClick={this.chartClk}
        style={{ width: '100%', height: '300px'}}
        title={
          { text: '本业经营情况' }
        }
        markLineObj={{
          average: 80,
          max: 150,
          min: 10
        }}
        // fontColor='white'
      /> */}
      
    </div>);
  }
}




