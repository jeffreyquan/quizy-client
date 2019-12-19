import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Preview from './Preview';
import Answer from './Answer';
import Result from './Result';
import Ranking from './Ranking';
import { FETCH_NUMBER_OF_QUESTIONS, RECEIVE_NUMBER_OF_QUESTIONS, RECEIVE_ANSWER_OPTIONS, ANSWER_SUBMITTED, ANSWER_RESULT, QUESTION_RESULT, FETCH_SCORE, PLAYER_RESULTS, RECEIVE_NEXT_ANSWER_OPTIONS, GAME_OVER, PLAYER_RANK, FINAL_RANK, FINAL, GO_TO_NEXT } from '../Events';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      nickname: null,
      pin: null,
      answer: null,
      score: 0,
      streak: 0,
      rank: 0,
      lastCorrect: false,
      totalCorrect: 0,
      questionNumber: 1,
      totalNumberOfQuestions: null,
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

    const data = {
      answer: letter,
      pin: this.state.pin
    }

    socket.emit(ANSWER_SUBMITTED, data);
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const pin = parsed.pin;
    console.log('Player joined room with pin:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    socket.emit(FETCH_NUMBER_OF_QUESTIONS, pin)


    socket.on(RECEIVE_NUMBER_OF_QUESTIONS, count => {
      this.setState({
        totalNumberOfQuestions: parseInt(count)
      })
    })

    socket.on(RECEIVE_ANSWER_OPTIONS, data => {
      this.setState({
        questionNumber: data.questionNumber,
        // totalNumberOfQuestions: data.totalNumberOfQuestions,
        answers: data.answers
      })
    })

    socket.on(ANSWER_RESULT, result => {
      this.setState({
        lastCorrect: true
      })
    })

    socket.on(QUESTION_RESULT, data => {
      const { nickname, pin } = this.state;
      const info = {
        nickname: nickname,
        pin: pin
      }

      socket.emit(FETCH_SCORE, info);
    })

    socket.on(PLAYER_RESULTS, data => {
      const { step } = this.state;
      const { score, rank, streak, lastCorrect } = data;
      this.setState({
        score: score,
        streak: streak,
        rank: rank,
        lastCorrect: lastCorrect,
        step: step + 1
      })
    });

    socket.on(RECEIVE_NEXT_ANSWER_OPTIONS, data => {
      const { step } = this.state;
      const { questionNumber, totalNumberOfQuestions, answers } = data;
      this.setState({
        questionNumber: questionNumber,
        totalNumberOfQuestions: totalNumberOfQuestions,
        answers: answers
      })
    })

    socket.on(GO_TO_NEXT, () => {
      this.setState({
        step: 1
      })
    })

    socket.on(GAME_OVER, () => {
      const pin = this.state.pin;
      socket.emit(PLAYER_RANK, pin);
    })

    socket.on(FINAL_RANK, data => {
      const { score, totalCorrect, rank } = data;
      this.setState({
        score: score,
        totalCorrect: totalCorrect,
        rank: rank
      })
    })

    socket.on(FINAL, () => {
      const { step } = this.state;
      this.setState({
        step: 4
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, nickname, answer, score, streak, lastCorrect, questionNumber, totalNumberOfQuestions, answers, rank } = this.state;
    console.log('Current step:', step);
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
          <Result
            lastCorrect={ lastCorrect }
            streak={ streak }
            rank={ rank }
            score={ score }
          />
        );
      case 4:
        return (
          <Ranking
            rank={ rank }
            score={ score }
          />
        )
    }
  }
}
