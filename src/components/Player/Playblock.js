import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Preview from './Preview';
import Answer from './Answer';
import Result from './Result';
import { RECEIVE_ANSWER_OPTIONS, ANSWER_SUBMITTED } from '../Events';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      pin: '',
      nickname: '',
      answer: '',
      score: 0,
      streak: 0,
      lastCorrect: false,
      questionNumber: 1,
      totalNumberOfQuestions: '',
      answers: []
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  submitAnswer = (letter) => {
    console.log('Answer submitted:', letter)
    this.setState({
      answer: letter
    })

    socket.emit(ANSWER_SUBMITTED, letter);
  }

  componentDidMount() {
    this.setState({
      pin: this.props.location.state.pin,
      quizId: this.props.location.state.nickname
    })

    socket.on(RECEIVE_ANSWER_OPTIONS, data => {
      this.setState({
        questionNumber: data.questionNumber,
        totalNumberOfQuestions: data.totalNumberOfQuestions,
        answers: data.answers
      })
    })

  }

  render() {
    const { step } = this.state;
    const { pin, nickname, answer, score, streak, lastCorrect, questionNumber, totalNumberOfQuestions, answers } = this.state;

    switch(step) {
      case 1:
        return (
          <Preview
            nextStep={ this.nextStep }
            pin={ pin }
            nickname={ nickname }
            questionNumber={ questionNumber }
            totalNumberOfQuestions={ totalNumberOfQuestions }
          />
        )
      case 2:
        return (
          <Answer
            submitAnswer={ this.submitAnswer }
            pin={ pin }
            nickname={ nickname }
            questionNumber={ questionNumber }
            totalNumberOfQuestions={ totalNumberOfQuestions }
            answers={ answers }
          />
        )
      case 3:
        return (
          <Result />
        );
    }
  }
}
