import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';

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
      this.props.nextStep();
    }
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer, 1000);
    this.setState({
      intervalId: intervalId
    })
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
        <div>{ this.state.playersAnswered } players answered.</div>
        <Pin pin={ pin } />
      </div>
    )
  }
}
