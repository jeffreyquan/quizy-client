import React, { Component } from 'react';
import io from 'socket.io-client';

const SOCKET_IO_URL = "http://localhost:3000";

export default class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      quizId: ''
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    this.setState({
      quizId: quizId
    })

    const socket = io(SOCKET_IO_URL);

    socket.on('connect', () => {

      socket.emit('hostJoin', quizId);

    });

  }

  render() {
    return(
      <div>
        Lobby coming soon.
      </div>
    )
  }
}
