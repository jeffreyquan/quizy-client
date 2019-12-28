import React, { Component } from 'react';
import styles from './QuizForm.module.scss';
import axios from 'axios';
import QuizDetailsForm from '../QuizDetailsForm/QuizDetailsForm';
import QuestionsForm from '../QuestionsForm/QuestionsForm';
import Confirm from '../Confirm/Confirm';
import Grid from '@material-ui/core/Grid';

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

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

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
    let res = await axios.post(URL('quizzes'), postRequest);
    const quizId = res.data._id;
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

    let component = null;
    switch(step) {
      case 1:
        component = <QuizDetailsForm
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          values={ values }
        />;
        break;
      case 2:
        component = <QuestionsForm
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          saveQuestion={ this.saveQuestion }
          values={ values }
        />;
        break;
      case 3:
        component = <Confirm
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          saveQuiz={ this.saveQuiz }
          values={ values }
        />;
        break;
      default:
        component = null;
    }

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
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
          alignItems="center"
          xs={12}
          style={{ minHeight: "90vh" }}
          className={ styles.container }
        >
          <h2 style={{ marginTop: "3rem", marginBottom: "6rem" }}>NEW QUIZ</h2>
          { component }
        </Grid>
      </Grid>
    )
  }
}
