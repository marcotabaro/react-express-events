import React, { Component } from 'react';
import './App.css';
import { Events} from "./Events"; 

class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
      const response = await fetch('/backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
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
