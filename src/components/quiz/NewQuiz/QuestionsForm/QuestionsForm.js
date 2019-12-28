import React, { Component } from 'react';
import styles from './QuestionsForm.module.scss';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { withStyles  } from '@material-ui/core/styles';

const QuestionInput = withStyles(theme => ({
  root: {
    '& input:invalid + fieldset': {
     borderColor: 'red',
     borderWidth: 2,
   },
 },
  input: {
    margin: "1rem 0",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      borderColor: theme.palette.common.black
    },
    '&:focus': {
      borderColor: theme.palette.common.black
    },
  },
}))(InputBase);

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
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '25vh' }}
        >
          <Grid item md={4} sm={12}>
            <h3>Add Questions:</h3>
          </Grid>
          <Grid item md={4} sm={12}>
            <QuestionForm
              saveQuestion={ saveQuestion }
            />
          </Grid>
          <Grid item md={4} sm={12}>
            <Grid
              container
            >
              <Grid item md={6} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={ this.back }
                  fullWidth
                  className={ styles.backBtn }
                >
                  Back
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ this.continue }
                  fullWidth
                  className={ styles.continueBtn }
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12}>
            <Grid
              container
              alignItems="flex-start"
              justify="center"
            >
              <Questions questions={ values.questions }/>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}

const Questions = (props) => {
  if (props.questions.length === 0) {
    return (<div className={ styles.questions }>No questions have been added.</div>)
  }

  const quizQuestions = props.questions.map((q, i) => (
    <div key={ i }>
      <div style={{ fontWeight: "bold" }}>Question { i + 1 }</div>
      <p>{ q.question } Answer: { q.answers[q.correct] }</p>
    </div>
  ))

  return (
    <div className={ styles.questions }>
      <h1>Current Questions:</h1>
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
      correct: 'none'
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
        <Grid
          container
          direction="row"
        >
          <Grid item xs={12}>
            <QuestionInput
              placeholder="Question"
              name="question"
              value={ this.state.question }
              onChange={ this.handleChange }  margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuestionInput
              placeholder="Answer A"
              name="a"
              value={ this.state.answers.a }
              onChange={ this.handleAnswerChange } margin="dense"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuestionInput
              placeholder="Answer B"
              name="b"
              value={ this.state.answers.b }
              onChange={ this.handleAnswerChange } margin="dense"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuestionInput
              placeholder="Answer C"
              name="c"
              value={ this.state.answers.c }
              onChange={ this.handleAnswerChange } margin="dense"
              variant="filled"
              fullWidth
              required
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuestionInput
              placeholder="Answer D"
              name="d"
              value={ this.state.answers.d }
              onChange={ this.handleAnswerChange } margin="dense"
              variant="filled"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              style={{ width: '100%' }}
              required
            >
              <Select
                name="correct"
                value={ this.state.correct }
                onChange={ this.handleChange }
                input={ <QuestionInput /> }
              >
                <MenuItem value="none" disabled>Correct Answer</MenuItem>
                <MenuItem value="a">A</MenuItem>
                <MenuItem value="b">B</MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="d">D</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{
                fontSize: "1.6rem",
                textAlign: "center",
                fontWeight: "bold",
                margin: "1rem 0",
                backgroundColor: "rgb(51, 51, 51)"
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={ styles.addQuestionBtn }
            >
              Add Question
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}
