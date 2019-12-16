import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import io from 'socket.io-client';

var socket;

class Header extends Component {
  constructor() {
    console.log('<header />')
    super();
    this.state = {
      endpoint: 'http://localhost:3000'
    };
  socket = io(this.state.endpoint);
  }

  render() {
    return(
      <></>
    )
  }
}

export { Header, socket };
