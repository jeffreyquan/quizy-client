import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';

export default class Preview extends Component {

  componentDidMount() {
    setTimeout(() => this.props.nextStep(), 5000);
  }

  render() {
    const { pin, nickname, questionNumber, totalNumberOfQuestions } = this.props;
    console.log('Hitting preview page');
    return (
      <div>
        <Pin pin={ pin } />
        <p>{ questionNumber } of { totalNumberOfQuestions }</p>
        <h2>Question { questionNumber }</h2>
      </div>
    )
  }
}
