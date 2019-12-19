import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';
import { GAME_HAS_STARTED } from '../Events';

export default class Instructions extends Component {
  constructor() {
    super();
    this.state = {
      nickname: null,
      pin: null
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const pin = parsed.pin;
    console.log('Instruction page for player in room:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    socket.on(GAME_HAS_STARTED, () => {
      this.props.history.push(`/getready?nickname=${ this.state.nickname }&pin=${ this.state.pin }`);
   })
  }

  render() {
    return (
      <div>
        <Pin pin={ this.state.pin }/>
        <p>You're in</p>
        <p>See your nickname on screen?</p>
      </div>
    )
  }
}
