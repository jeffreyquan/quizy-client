import React, { Component } from 'react';
import axios from 'axios';
import QuizDetailsForm from '../QuizDetailsForm/QuizDetailsForm';
import QuestionsForm from '../QuestionsForm/QuestionsForm';
import Confirm from '../Confirm/Confirm';

let URL = (model) => {
  return `http://localhost:3000/${ model }/`
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

  saveQuiz = async () => {
    const { name, category, questions } = this.state;
    const postRequest = {
      name: name,
      category: category,
      questions: questions
    }
    console.log(postRequest);
    let res = await axios.post(URL('quizzes'), postRequest);
    const quizId = res.data._id;
    console.log(quizId);
    this.props.history.push(`/quizzes/${ quizId }`);
  }

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
        return (
          <Confirm
            nextStep={ this.nextStep }
            prevStep={ this.prevStep }
            saveQuiz={ this.saveQuiz }
            values={ values }
          />
        );
      default:
        return (
          <QuizDetailsForm
            nextStep={ this.nextStep }
            handleChange={ this.handleChange }
            values={ values }
          />
        )
    }
  }
}
