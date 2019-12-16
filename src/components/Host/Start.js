import React, { Component } from 'react';
import { socket } from '../Global/Header';
import { GAME_INTRO, FETCH_INTRO } from '../Events';

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0,
      quizId: '',
      quizName: null,
      numberOfQuestions: 0,
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    console.log( pin );
    this.setState({
      pin: pin,
      quizId: quizId
    })

    socket.emit(FETCH_INTRO, pin);

    socket.on(GAME_INTRO, data => {
      console.log( data );
      const { quizName, numberOfQuestions } = data;
      this.setState({
        quizName: quizName,
        numberOfQuestions: numberOfQuestions
      })

      setTimeout(() => {
        this.props.history.push(`/question?quizId=${ this.state.quizId }&pin=${ this.state.pin }`);
      }, 5000);

    });

  }

  render() {
    return(
      <div>
        <h1>{ this.state.quizName }</h1>
        <p>{ this.state.numberOfQuestions} Questions</p>
        <p>Are you ready</p>
        <p>Pin: { this.state.pin }</p>
      </div>
    )
  }
}
