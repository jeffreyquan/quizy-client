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
      <BrowserRouter>
        <header>
          <nav>
            <ul className="nav">
              <li>
                <Link to="/">Join Game</Link>
              </li>
            </ul>
          </nav>
        </header>
      </BrowserRouter>
    )
  }
}

export { Header, socket };
