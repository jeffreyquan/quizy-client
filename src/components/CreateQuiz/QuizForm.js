import React, { Component } from 'react';
import axios from 'axios';
import QuizDetailsForm from './QuizDetailsForm';
import QuestionsForm from './QuestionsForm';

let URL = ( model, id = '') => {
  return `https://localhost:3000/${ model }/${ id }`
};

export default class QuizForm extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      name: '',
      category: '',
      questions: []
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  // saveQuiz = (event) => {
  //   event.preventDefault();
  //   axios.post(URL('quizzes'), this.state).then
  // }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveQuestion = content => {
    this.setState({
      questions: [...this.state.questions, content]
    });
  };

  saveQuiz = content => {
    axios.post(URL('quizzes'), this.state)
  };

  render() {
    const { step } = this.state;
    const { name, category, questions } = this.state;
    const values = { name, category, questions };

    switch(step) {
      case 1:
        return (
          <QuizDetailsForm
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
      case 2:
        return (
          <QuestionsForm
            nextStep={ this.nextStep }
            prevStep={ this.prevStep }
            saveQuestion={ this.saveQuestion }
            values={ values }
          />
        )
      case 3:
        return <h1>Confirm</h1>
      case 4:
        return <h1>Success</h1>
    }
  }
}
