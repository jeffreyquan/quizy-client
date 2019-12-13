import React, { Component } from 'react';
import { TextField, Button, FormControl, Grid, Select, MenuItem, InputLabel } from '@material-ui/core';

export default class QuestionsForm extends Component {
  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  };

  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, saveQuestion } = this.props;
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '25vh' }}
        >
          <Grid item xs={6}>
            <h1>Add Questions:</h1>
          </Grid>
          <Grid item xs={6}>
            <QuestionForm
              saveQuestion={ saveQuestion }
            />
          </Grid>
          <div className="controls">
            <Button variant="contained" color="secondary" onClick={ this.back }>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={ this.continue }>
              Continue
            </Button>
          </div>
          <Grid item xs={6}>
            <h2>Current questions:</h2>
            <Questions questions={ values.questions }/>
          </Grid>
        </Grid>
      </>
    )
  }
}

const Questions = (props) => {
  if (props.questions.length === 0) {
    return (<div>No questions have been added.</div>)
  }

  const quizQuestions = props.questions.map((q, i) => (
    <div>
    </div>
  ))

  return (
    <div>
      { quizQuestions }
    </div>
  )
}

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      answers: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      correct: ''
    };
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleAnswerChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [name]: value
      }
    }))
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveQuestion(this.state);
    this.setState({
      question: '',
      answers: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      correct: ''
    });
  };

  render() {
    return (
      <form variant="outlined" onSubmit={ this.handleSubmit } >
        <TextField label="Question" name='question' value={ this.state.question } onChange={ this.handleChange }  margin="dense" variant="filled" fullWidth/>
        <TextField label="Answer A:" name='a' value={ this.state.answers.a } onChange={ this.handleAnswerChange } margin="dense" variant="filled" required fullWidth/>
        <TextField label="Answer B:" name='b' value={ this.state.answers.b } onChange={ this.handleAnswerChange } margin="dense" variant="filled" required fullWidth/>
        <TextField label="Answer C:" name='c' value={ this.state.answers.c } onChange={ this.handleAnswerChange } margin="dense" variant="filled" required fullWidth/>
        <TextField label="Answer D:" name='d' value={ this.state.answers.d } onChange={ this.handleAnswerChange } margin="dense" variant="filled" required fullWidth/>
        <FormControl margin="dense" variant="filled" style={{ width: '100%' }}>
          <InputLabel>Correct Answer:</InputLabel>
          <Select
            name="correct"
            value={ this.state.correct } onChange={ this.handleChange }
          >
            <MenuItem value="a">A</MenuItem>
            <MenuItem value="b">B</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="d">D</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type='submit'>
          Add Question
        </Button>
      </form>
    )
  }
}
