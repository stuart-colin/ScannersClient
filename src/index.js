import React from "react";
import ReactDOM from "react-dom";
import Test from "./components/Test";

class App extends React.Component {
  render() {
    //return <MiniMap />;
    return <Test />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
