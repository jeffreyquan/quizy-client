import React, { Component } from 'react';
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
      answers: {
        'a': '',
        b: '',
        c: '',
        d: ''
      },
      correct: ''
    };
  };

  _handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  _handleAnswerChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [name]: value
      }
    }))
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      answers: {
        'a': '',
        b: '',
        c: '',
        d: ''
      },
      correct: ''
    })
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit } >
        <input type='text' name='body' value={ this.state.body } onChange={ this._handleChange } placeholder="Question" />
        <label>Answer A: </label>
        <input type='text' name='a' value={ this.state.answers.a } onChange={ this._handleAnswerChange } required />
        <label>Answer B: </label>
        <input type='text' name='b' value={ this.state.answers.b } onChange={ this._handleAnswerChange } required />
        <label>Answer C: </label>
        <input type='text' name='c' value={ this.state.answers.c } onChange={ this._handleAnswerChange } required />
        <label>Answer D: </label>
        <input type='text' name='d' value={ this.state.answers.d } onChange={ this._handleAnswerChange } required />
        <label>Correct Answer:</label>
        <select name="correct" value={ this.state.correct } onChange={ this._handleChange }>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </select>
        <input type='submit' />
      </form>
    )
  }
}

export default QuizForm;
