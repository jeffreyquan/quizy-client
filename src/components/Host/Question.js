import React, { Component } from 'react';
import { FETCH_QUESTION, RECEIVE_QUESTION } from '../Events';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0,
      quizId: '',
      question: null,
      questionNumber: null,
      questionShow: true,
      totalNumberOfQuestions: ''
    }
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parsed.pin;
    this.setState({
      pin: pin,
      quizId: quizId
    })

    socket.emit(FETCH_QUESTION, pin);

    socket.on(RECEIVE_QUESTION, data => {
      const { questionShow, questionNumber, question } = data;
      this.setState({
        question: question,
        questionNumber: questionNumber,
        questionShow: questionNumber,
        totalNumberOfQuestions: totalNumberOfQuestions
      })
    })
  }
  render() {
    return (
      <div>
        <div>{ this.state.questionNumber } of { this.state.totalNumberOfQuestions }</div>
        <div>Question: { this.state.question }</div>
      </div>
    )
  }
}
