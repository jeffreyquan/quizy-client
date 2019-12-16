import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';
import { GAME_HAS_STARTED } from '../Events';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      pin: ''
    };
  }

  componentDidMount() {
    this.setState({
      nickname: this.props.location.state.nickname,
      pin: this.props.location.state.pin
    })

    socket.on(GAME_HAS_STARTED, () => {
      this.props.history.push({
        pathname: `/play`,
        state: {
          pin: this.state.pin,
          nickname: this.state.nickname
        }
      })
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
