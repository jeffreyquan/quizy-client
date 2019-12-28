import React, { Component } from 'react';
import { socket } from '../../Global/Header';
import QuestionBlockIntro from '../QuestionBlockIntro/QuestionBlockIntro';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import ResultBlock from '../ResultBlock/ResultBlock';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gameover from '../Gameover/Gameover';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      gameId: null,
      quizId: null,
      quizName: null,
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
      correctAnswer: null,
      gameStatus: true,
      rankedPlayers: []
    };
  }

  nextStep = () => {
    const { step, questionNumber, totalNumberOfQuestions } = this.state;
    this.setState({
      step: step + 1
    });

    if (questionNumber === totalNumberOfQuestions) {
      this.setState({
        gameStatus: false
      })
    }
  }

  nextQuestion = () => {
    this.setState({
      step: 1,
      rankedPlayers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      answeredD: 0,
      correctAnswer: null
    })
    const { pin } = this.state;
    socket.emit("PROCEED_TO_NEXT_QUESTION", pin);
  }

  endGame = () => {
    this.setState({
      step: 5
    })
    const pin = this.state.pin;
    socket.emit("FINISH_GAME", pin);
  }

  fetchScoreboard = () => {
    const { gameId } = this.state;
    socket.emit("FETCH_SCOREBOARD", gameId);
    console.log('Host requesting for scoreboard.');
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    console.log('Question for room with pin', pin);
    this.setState({
      pin: pin,
      quizId: quizId
    })

    socket.emit("FETCH_FIRST_QUESTION", pin);

    socket.on("RECEIVE_FIRST_QUESTION", data => {
      const { gameId, quizName, questionNumber, question, totalNumberOfQuestions } = data;
      console.log('Receiving question: ', data);
      this.setState({
        gameId: gameId,
        quizName: quizName,
        question: question.question,
        answers: question.answers,
        correctAnswer: question.correct,
        totalNumberOfQuestions: totalNumberOfQuestions
      })
    })

    socket.on("QUESTION_RESULT", data => {
      const { answeredA, answeredB, answeredC, answeredD, correctAnswer } = data;
      console.log(data);
      this.setState({
        answeredA: answeredA,
        answeredB: answeredB,
        answeredC: answeredC,
        answeredD: answeredD,
        correctAnswer: correctAnswer,
        step: 3
      });

    });

    socket.on("RECEIVE_SCOREBOARD", rankedPlayers => {
      console.log('Receiving ranked players for scoreboard: ', rankedPlayers);
      this.setState({
        rankedPlayers: rankedPlayers
      })
    })

    socket.on("NEXT_QUESTION", data => {
      const { questionNumber, question } = data;
      console.log('Receiving next question: ', data);
      this.setState({
        questionNumber: questionNumber,
        question: question.question,
        answers: question.answers,
        correctAnswer: question.correct,
      })
    });

    socket.on("GAME_OVER", data => {
      this.setState({
        gameStatus: false,
        rankedPlayers: data
      })
    })
  }

  render() {
    const { step } = this.state;
    const { quizName, pin, questionNumber, totalNumberOfQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, playersAnswered, rankedPlayers, gameStatus } = this.state;
    console.log('Step: ', step);

    let component = null;
    switch(step) {
      case 1:
        component = <QuestionBlockIntro
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          questionNumber={ questionNumber }
          question={ question }
          totalNumberOfQuestions={ totalNumberOfQuestions }
        />
        break;
      case 2:
        component = <QuestionBlock
          nextStep={ this.nextStep }
          pin={ pin }
          question={ question }
          answers={ answers }
          playersAnswered={ playersAnswered }
        />
        break;
      case 3:
        component = <ResultBlock
          answers={ answers }
          answeredA={ answeredA }
          answeredB={ answeredB }
          answeredC={ answeredC }
          answeredD={ answeredD }
          correctAnswer={ correctAnswer }
          question={ question }
          pin={ pin }
          nextStep={ this.nextStep }
          fetchScoreboard={ this.fetchScoreboard }
        />
        break;
      case 4:
        component = <Scoreboard
          pin={ pin }
          rankedPlayers={ rankedPlayers }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nextQuestion={ this.nextQuestion }
          endGame={ this.endGame }
          gameStatus={ gameStatus }
        />
        break;
      case 5:
        component = <Gameover
          quizName={ quizName }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          finalRankings={ rankedPlayers }
        />
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
