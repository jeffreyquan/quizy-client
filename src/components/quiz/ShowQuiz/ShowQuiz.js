import React, { Component } from 'react';
import styles from './ShowQuiz.module.scss';
import { Link } from 'react-router-dom';
import QuizInfo from '../../utils';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class ShowQuiz extends Component {
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
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{ minHeight: "100vh" }}
        className={ styles.container }
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className={ styles.title }
        >
          <h1>QUIZY</h1>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          md={6}
          xs={12}
          style={{ minHeight: "90vh" }}
          className={ styles.preview }
        >
          <h2>QUIZ PREVIEW</h2>
          <h3>Name: { this.state.name }</h3 >
          <h3>Category: { this.state.category }</h3 >
          <PreviewQuestions questions={ this.state.questions } />
          <Link to={`/lobby?quizId=${ this.state.id }`}>
            <Button
              style={{
                fontSize: "1.6rem",
                textAlign: "center",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
              variant="contained"
              color="primary"
              className={ styles.hostGameBtn }
            >
              Host Game
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

const PreviewQuestions = (props) => {
  if (props.questions.length === 0) {
    return (<div className={ styles.questions }>Questions are loading.</div>)
  }

  const questions = props.questions.map((q, i) => (
    <div key={ i }>
      <div style={{ fontWeight: "bold" }}>Question { i + 1 }</div>
      <p>{ q.question }</p>
    </div>
  ))

  return (
    <div className={ styles.questions }>
      { questions }
    </div>
  )
}
