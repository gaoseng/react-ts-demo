import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./Hello";

class App extends React.Component {
  test() {
      let x = () => {
          return  1;
      }
      x();
  }
  render() {
      this.test();
    return (
      <div><Hello compiler="TypeScript" framework="React" />,</div>
      
    )
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById("root")
)