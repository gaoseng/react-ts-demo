import React, { Context } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Store } from '@/store';
import './app.page.scss';
import { Button } from 'antd';
import { LongPress } from '@/utils';
import { SlotContainer } from '@/components/slots/slot-container';
import { TopSlot } from '@/components/slots/top-slot';
import { MainSlot } from '@/components/slots/main-slot';
import { BottomSlot } from '@/components/slots/bottom-slot';


const AppContext = React.createContext<string>('test');
const SubAppContext = React.createContext<string>('subTest');
interface PropsType {
  store: Store;
}
class Child extends React.Component {
  static contextType = {...AppContext, ...SubAppContext };
  context: string;
  render() {
    console.log(this.context);
    return <div>child</div>;
  }
}
class SubApp extends React.Component {
  render() {
    return <SubAppContext.Provider value='subApp'>
      <Child></Child>
    </SubAppContext.Provider>;
  }
}
@inject('store')
@observer
export default class App extends React.Component<PropsType> {
  getTop = () => {
    return <TopSlot title={'slot top'} />;
  }
  getMain = () => {
    return <MainSlot content={'main'} />;
  }
  getBottom = () => {
    return <BottomSlot content={'bottom'} />;
  }
  render() {
    return (<div className='active-replace'>
      <Link to='/login' >124</Link>
      <Button type='primary' {...LongPress((e) => {
        console.log(e);
      })}>press event</Button>
      
      <SlotContainer
        top={this.getTop()}
        main={this.getMain()}
        bottom={this.getBottom()}
        obj={{test: 123}}
      >
        {() => <>123</>}
      </SlotContainer>

      <AppContext.Provider value='app'>
        <SubApp />
      </AppContext.Provider>

    </div>);
  }
}















