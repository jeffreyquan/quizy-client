import React, { Component } from 'react';
import StatusBar from '../StatusBar/StatusBar';
import styles from './Preview.module.scss';
import Grid from '@material-ui/core/Grid';

export default class Preview extends Component {

  componentDidMount() {
    setTimeout(() => this.props.nextStep(), 5000);
  }

  render() {
    const { pin, nickname, questionNumber, totalNumberOfQuestions } = this.props;
    console.log('Hitting preview page');
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <StatusBar
          pin={ pin }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nickname={ nickname }
        />
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
          className={ styles.questionNumber }
        >
          Question { questionNumber }
        </Grid>
      </Grid>
    )
  }
}
