import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';

export default class QuestionBlockIntro extends Component {

  componentDidMount() {
    this.id = setTimeout(() => this.props.nextStep(), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    const { questionNumber, question, totalNumberOfQuestions } = this.props
    return (
      <div>
        <div>{ questionNumber } of { totalNumberOfQuestions }</div>
        <div>Question: { question }</div>
      </div>
    )
  }
}
