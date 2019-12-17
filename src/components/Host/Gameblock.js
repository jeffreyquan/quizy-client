import React, { Component } from 'react';
import { socket } from '../Global/Header';
import QuestionBlockIntro from './QuestionBlockIntro';
import QuestionBlock from './QuestionBlock';
import ResultBlock from './ResultBlock';
import Scoreboard from './Scoreboard';
import { FETCH_QUESTION, RECEIVE_QUESTION } from '../Events';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      quizId: '',
      pin: '',
      questionNumber: 1,
      totalNumberOfQuestions: '',
      question: null,
      answers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      andweredD: 0,
      correct: null
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parsed.pin;
    console.log('Question for room with pin', pin);
    this.setState({
      pin: pin,
      quizId: quizId
    })

    socket.emit(FETCH_QUESTION, pin);

    socket.on(RECEIVE_QUESTION, data => {
      const { questionNumber, question, totalNumberOfQuestions } = data;
      console.log('Receiving question: ', data);
      this.setState({
        questioNumber: questionNumber,
        question: question.question,
        answers: question.answers,
        correct: question.correct,
        totalNumberOfQuestions: totalNumberOfQuestions
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, questionNumber, totalNumberOfQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correct, playersAnswered } = this.state;

    switch(step) {
      case 1:
        return (
          <QuestionBlockIntro
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            questionNumber={ questionNumber }
            question={ question }
            totalNumberOfQuestions={ totalNumberOfQuestions }
          />
        )
      case 2:
        return (
          <QuestionBlock
            nextStep={ this.nextStep }
            pin={ pin }
            question={ question }
            answers={ answers }
            playersAnswered={ playersAnswered }
          />
        )
      case 3:
        return (
          <ResultBlock />
        );
      case 4:
        return (
          <Scoreboard />
        )
    }
  }
}
