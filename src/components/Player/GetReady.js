import React, { Component } from 'react';
import { socket } from '../Global/Header';
import { READY } from '../Events';

export default class GetReady extends Component {
  constructor(props) {
    super(props);
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
    console.log('Get ready page for player in room:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    setTimeout(() => {
      this.props.history.push(`/playblock?nickname=${ this.state.nickname }&pin=${ this.state.pin }`)
    }, 5000);
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
