import React, { Component } from 'react';
import { socket } from '../Global/Header';
import QuestionBlockIntro from './QuestionBlockIntro';
import QuestionBlock from './QuestionBlock';
import ResultBlock from './ResultBlock';
import Scoreboard from './Scoreboard';
import Gameover from './Gameover';
import { FETCH_QUESTION, RECEIVE_QUESTION, QUESTION_RESULT, FETCH_SCOREBOARD, RECEIVE_SCOREBOARD, NEXT_QUESTION, GAME_OVER, FINISH_GAME, NEXT } from '../Events';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      quizId: '',
      pin: null,
      questionNumber: 1,
      totalNumberOfQuestions: null,
      questionStatus: true,
      question: null,
      answers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      answeredD: 0,
      correct: null,
      gameStatus: true,
      rankedPlayers: []
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  nextQuestion = () => {
    this.setState({
      step: 1
    })
    const { pin } = this.state;
    socket.emit(NEXT, pin);
  }

  endGame = () => {
    this.setState({
      step: 5
    })
    const pin = this.state.pin;
    socket.emit(FINISH_GAME, pin);
  }

  fetchScoreboard = () => {
    const { quizId, pin } = this.state;
    socket.emit(FETCH_SCOREBOARD, { quizId: quizId, pin: pin });
    console.log('Host requesting for scoreboard.');
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

    socket.on(QUESTION_RESULT, data => {
      const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = data;
      const { step, quizId, pin, questionNumber } = this.state;
      console.log(data);
      this.setState({
        answeredA: answeredA,
        answeredB: answeredB,
        answeredC: answeredC,
        answeredD: answeredD,
        correct: correctAnswer,
        step: step + 1
      });

    });

    socket.on(RECEIVE_SCOREBOARD, rankedPlayers => {
      console.log('Receiving ranked players for scoreboard: ', rankedPlayers);
      this.setState({
        rankedPlayers: rankedPlayers
      })
    })

    socket.on(NEXT_QUESTION, data => {
      const { questionNumber, question, numberOfPlayers } = data;
      console.log('Receiving next question: ', data);
      this.setState({
        questionNumber: questionNumber,
        question: question.question,
        answers: question.answers,
        correct: question.correct,
      })
    });

    socket.on(GAME_OVER, data => {
      this.setState({
        gameStatus: false,
        rankedPlayers: data
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, questionNumber, totalNumberOfQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correct, playersAnswered, rankedPlayers, gameStatus } = this.state;
    console.log('Step: ', step);
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
          <ResultBlock
            answers={ answers }
            answeredA={ answeredA }
            answeredB={ answeredB }
            answeredC={ answeredC }
            answeredD={ answeredD }
            correct={ correct }
            pin={ pin }
            questionNumber={ questionNumber }
            onNext={  this.nextStep }
            fetchScoreboard={ this.fetchScoreboard }
          />
        );
      case 4:
        return (
          <Scoreboard
            pin={ pin }
            rankedPlayers={ rankedPlayers }
            nextQuestion={ this.nextQuestion }
            endGame={ this.endGame }
            gameStatus={ gameStatus }
          />
        )
      case 5:
        return (
          <Gameover
            totalNumberOfQuestions={ totalNumberOfQuestions }
            finalRankings={ rankedPlayers }
          />
        )
    }
  }
}
