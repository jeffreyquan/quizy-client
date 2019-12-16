import React, { Component } from 'react';
import { socket } from '../Global/Header';
import { READY } from '../Events';

export default class PlayerStart extends Component {
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

    socket.on(READY, () => {
      console.log('Player ready....');
      setTimeout(() => {
        this.props.history.push({
          pathname: `/getready`,
          state: {
            pin: this.state.pin,
            nickname: this.state.nickname
          }
        })
      }, 5000);
    });
  }

  render() {
    return(
      <div>
        <h1>Get ready</h1>
        <p>Loading...</p>
      </div>
    )
  }
}
