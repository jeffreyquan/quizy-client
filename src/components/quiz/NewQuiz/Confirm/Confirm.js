import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button  from '@material-ui/core/Button';

export default class Confirm extends Component {
  continue = event => {
    event.preventDefault();
    this.props.saveQuiz();
  };

  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values: { name, category, questions} } = this.props;
    return (
      <>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item md={4} sm={12}>
            <h1>Confirm details:</h1>
          </Grid>
          <Grid item md={4} sm={12}>
            <Grid
              container
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <QuizDetails name={ name } category={ category } />
                <QuestionList questions={ questions } />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12}>
            <Grid
              container
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <Button variant="contained" color="secondary" onClick={ this.back } fullWidth>
                  Back
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button variant="contained" color="primary" onClick={ this.continue } fullWidth>
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}

const QuizDetails = (props) => {
  return (
    <div>
      <p><span style={{ fontWeight: "bold" }}>Name: </span>{ props.name }</p>
      <p><span style={{ fontWeight: "bold" }}>Category: </span>{ props.category }</p>
    </div>
  )
}

const QuestionList = (props) => {
  const quizQuestions = props.questions.map((q,i) => (
    <div key={ i }>
      <div style={{ fontWeight: "bold" }}>Question { i + 1 }</div>
      <p>{ q.question } Answer: { q.answers[q.correct] }</p>
    </div>
  ))

  return (
    <div>
      { quizQuestions }
    </div>
  )
}
