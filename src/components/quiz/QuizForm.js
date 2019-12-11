import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let URL = ( model, id = '') => {
  return `https://localhost:3000/${ model }/${ id }`
};

class QuizForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      questions: []
    };
    this._handleChange = this._handleChange.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.saveQuiz = this.saveQuiz.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  _handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }

  saveQuestion(content) {
    this.setState({questions: [...this.state.questions, content]});
  }

  saveQuiz(content) {
    axios.post(URL('quizzes'), this.state)
  };

  addQuestion() {
    return (
      <QuestionForm />
    )
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" name="name" placeholder="Quiz Name" value={ this.state.name } onChange={ this._handleChange } required />
          <input type="text" name="category" placeholder="Category" value={ this.state.category } onChange={ this._handleChange } required />
        </form>
        <QuestionForm onSubmit={ this.saveQuestion }/>
        <button onClick={() => this.addQuestion() }>Add Question</button>
      </div>
    )
  }
}

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      body: '',
      answers: [
        {
          body: ''
        },
        {
          body: ''
        },
        {
          body: ''
        },
        {
          body: ''
        }
      ],
      correct: ''
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  };

  _handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      answers: [
        {
          body: ''
        },
        {
          body: ''
        },
        {
          body: ''
        },
        {
          body: ''
        }
      ],
      correct: ''
    })
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit } >
        <input type='text' name='body' value={ this.state.body } onChange={ this._handleChange } placeholder="Question" />
        <label>Answer 1: </label>
        <input type='text' name='answer' value={ this.state.answers[0].body } required />
        <label>Answer 2: </label>
        <input type='text' name='answer' value={ this.state.answers[1].body } required />
        <label>Answer 3: </label>
        <input type='text' name='answer' value={ this.state.answers[2].body } required />
        <label>Answer 4: </label>
        <input type='text' name='answer' value={ this.state.answers[3].body } required />
        <input type='submit' />
      </form>
    )
  }
}

export default QuizForm;
