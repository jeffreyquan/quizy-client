import React, { Component } from 'react';
import styles from './QuestionBlockIntro.module.scss';
import Grid from '@material-ui/core/Grid';

export default class QuestionBlockIntro extends Component {

  componentDidMount() {
    this.id = setTimeout(() => this.props.nextStep(), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    const { questionNumber, question, totalNumberOfQuestions } = this.props
    return (
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
        className={ styles.main }
      >
        <div className={ styles.status }>
          { questionNumber } of { totalNumberOfQuestions }
        </div>
        <Grid
          item
          container
          xs={10}
          alignItems="center"
          justify="center"
          className={ styles.question }
        >
          { question }
        </Grid>
      </Grid>
    )
  }
}
