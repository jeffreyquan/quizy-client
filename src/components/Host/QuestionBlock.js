import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';
import { END_QUESTION, FETCH_TIME, TIME, UPDATE_PLAYERS_ANSWERED } from '../Events';

export default class QuestionBlock extends Component {
  constructor() {
    super();
    this.state = {
      time: 20,
      playersAnswered: 0,
      intervalId: ''
    }
  }

  timer = () => {
    this.setState({
      time: this.state.time - 1
    })

    if (this.state.time <= 0 ) {
      clearInterval(this.state.intervalId);
      const pin = this.props.pin;
      socket.emit(END_QUESTION, pin);
      this.props.nextStep();
    }
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer, 1000);
    this.setState({
      intervalId: intervalId
    })

    socket.on(UPDATE_PLAYERS_ANSWERED, playersAnswered => {
      this.setState({
        playersAnswered: playersAnswered
      })
    })

    socket.on(FETCH_TIME, playerId => {

      const data = {
        pin: this.props.pin,
        playerId: playerId,
        time: this.state.time
      }

      socket.emit(TIME, data);
    })
  }

  componentWillUnmount() {
    socket.off(UPDATE_PLAYERS_ANSWERED);
    socket.off(FETCH_TIME);
  }

  render() {
    const { pin, question, answers } = this.props;
    return (
      <div>
        <div>Question: { question }</div>
        <div>Time: { this.state.time }</div>
        <div>{ answers.a }</div>
        <div>{ answers.b }</div>
        <div>{ answers.c }</div>
        <div>{ answers.d }</div>
        <div>{ this.state.playersAnswered } answered.</div>
        <Pin pin={ pin } />
      </div>
    )
  }
}
