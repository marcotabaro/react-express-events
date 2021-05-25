import React, { Component } from 'react';
import './App.css';
import { Events} from "./Events"; 

class App extends Component {
  state = {
      data: null
    };  
      render() {
      return (
      <div className="App">
        <Events />
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}

export default App;
