import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { socket } from '../../Global/Header';
import Preview from '../Preview/Preview';
import Answer from '../Answer/Answer';
import Result from '../Result/Result';
import Ranking from '../Ranking/Ranking';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      gameId: null,
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
      answers: [],
      hostDisconnected: false
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  submitAnswer = letter => {
    this.setState({
      answer: letter
    })

    const data = {
      answer: letter,
      gameId: this.state.gameId
    }

    socket.emit("ANSWER_SUBMITTED", data);
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const pin = parseInt(parsed.pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    socket.on("HOST_DISCONNECTED", () => {
      this.setState({
        hostDisconnected: true
      })
    })

    socket.emit("FETCH_NUMBER_OF_QUESTIONS", pin)

    socket.on("RECEIVE_NUMBER_OF_QUESTIONS", data => {
      const { gameId, totalNumberOfQuestions } = data;
      this.setState({
        gameId: gameId,
        totalNumberOfQuestions: totalNumberOfQuestions
      })
    })

    socket.on("RECEIVE_ANSWER_OPTIONS", data => {
      this.setState({
        questionNumber: data.questionNumber,
        answers: data.answers
      })
    })

    socket.on("QUESTION_RESULT", data => {
      const { nickname, gameId } = this.state;
      const info = {
        nickname: nickname,
        gameId: gameId
      }

      socket.emit("FETCH_SCORE", info);
    })

    socket.on("PLAYER_RESULTS", data => {
      const { step } = this.state;
      const { score, rank, streak, lastCorrect } = data;
      this.setState({
        score: score,
        rank: rank,
        streak: streak,
        lastCorrect: lastCorrect,
        step: step + 1
      })
    });

    socket.on("RECEIVE_NEXT_ANSWER_OPTIONS", data => {
      const { questionNumber, totalNumberOfQuestions, answers } = data;
      this.setState({
        questionNumber: questionNumber,
        totalNumberOfQuestions: totalNumberOfQuestions,
        answers: answers
      })
    })

    socket.on("GO_TO_NEXT_QUESTION", () => {
      this.setState({
        step: 1
      })
    })

    socket.on("GAME_OVER", () => {
      const gameId = this.state.gameId;
      socket.emit("PLAYER_RANK", gameId);
    })

    socket.on("FINAL_RANK", data => {
      const { score, totalCorrect, rank } = data;
      this.setState({
        score: score,
        totalCorrect: totalCorrect,
        rank: rank
      })
    })

    socket.on("FINAL_VIEW", () => {
      this.setState({
        step: 4
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, nickname, score, streak, lastCorrect, questionNumber, totalNumberOfQuestions, answers, rank } = this.state;

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
          nickname={ nickname }
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
        {
          this.state.hostDisconnected ?
          <Redirect to='/' />
          : null
        }
      </div>
    )
  }
}
