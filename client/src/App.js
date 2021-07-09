import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {}
    };
  }

  componentDidMount() {
     axios.get('/api/v1/say-something').then((res)=>{
       const response = res.data;
       this.setState({
         response: response
       });
     })
  }


  render() {
    return (
      <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{this.state.response.body}</h1>
        
      </div>
    )
  }
}
