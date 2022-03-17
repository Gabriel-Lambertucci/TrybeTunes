import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Content from './components/Content';
import './Style/App.css';

class App extends React.Component {
  render() {
    return (
      <div id="App-div">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Content />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
