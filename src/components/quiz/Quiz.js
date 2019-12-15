import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QuizInfo from '../utils';
import { Container } from '@material-ui/core';
import io from 'socket.io-client';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      questions: []
    }
  }

  componentDidMount() {
    console.log( this.props.match.params );
    const { quizId } = this.props.match.params;
    console.log( quizId );
    QuizInfo.getQuiz( quizId ).then(( { data } ) => {
      const { _id, name, category, questions } = data;
      console.log(name, category, questions);
      this.setState({
        id: _id,
        name: name,
        category: category,
        questions: questions
      })
    });
  }

  render() {
    return (
      <>
        <Container maxWidth="md">
          <h1>Quiz preview</h1>
          <h2>Quiz: { this.state.name }</h2>
          <h2>Category: { this.state.category }</h2>
          <PreviewQuestions questions={ this.state.questions } />
          <Link to={`/lobby?quizId=${ this.state.id }`}>
            Host Game
          </Link>
        </Container>
      </>
    );
  }
}

const PreviewQuestions = (props) => {
  if (props.questions.length === 0) {
    return (<div>Questions are loading.</div>)
  }

  const questions = props.questions.map((q, i) => (
    <div key={ i }>
      <div style={{ fontWeight: "bold" }}>Question { i + 1 }</div>
      <p>{ q.question }</p>
    </div>
  ))

  return (
    <div>
      { questions }
    </div>
  )
}
