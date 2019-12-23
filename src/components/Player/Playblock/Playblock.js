import React, { Component } from 'react';
import { socket } from '../../Global/Header';
import Preview from '../Preview/Preview';
import Answer from '../Answer/Answer';
import Result from '../Result/Result';
import Ranking from '../Ranking/Ranking';
import { FETCH_NUMBER_OF_QUESTIONS, RECEIVE_NUMBER_OF_QUESTIONS, RECEIVE_ANSWER_OPTIONS, ANSWER_SUBMITTED, ANSWER_RESULT, QUESTION_RESULT, FETCH_SCORE, PLAYER_RESULTS, RECEIVE_NEXT_ANSWER_OPTIONS, GAME_OVER, PLAYER_RANK, FINAL_RANK, FINAL, GO_TO_NEXT } from '../../Events';

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
      this.setState({
        step: 4
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, nickname, score, streak, lastCorrect, questionNumber, totalNumberOfQuestions, answers, rank } = this.state;
    console.log('Current step:', step);

    let component = null;
    switch(step) {
      case 1:
        component = <Preview
          nextStep={ this.nextStep }
          pin={ pin }
          nickname={ nickname }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
        />;
        break;
      case 2:
        component = <Answer
          submitAnswer={ this.submitAnswer }
          pin={ pin }
          nickname={ nickname }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          answers={ answers }
        />;
        break;
      case 3:
        component = <Result
          pin={ pin }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nickname={ nickname }
          lastCorrect={ lastCorrect }
          streak={ streak }
          rank={ rank }
          score={ score }
        />;
        break;
      case 4:
        component = <Ranking
          rank={ rank }
          score={ score }
        />;
        break;
      default:
        component = null
    }
    return (
      <div>
        { component }
      </div>
    )
  }
}
