import React from 'react';
import ReactDOM from 'react-dom';
import MiniMap from './components/MiniMap';

class App extends React.Component {
  render() {
    return <MiniMap />;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
