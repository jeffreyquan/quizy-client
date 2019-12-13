import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuizInfo from '../utils';

let URL = ( model, id = '') => {
  return `https://localhost:3000/${ model }/${ id }`
};


class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      questions: []
    }
  }

  componentDidMount() {
    const { quizId } = this.props.match.params;

    QuizInfo.getQuiz( quizId ).then(( { data }) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>Quiz coming soon</h1>
      </div>
    )
  }
}

export default Quiz;
