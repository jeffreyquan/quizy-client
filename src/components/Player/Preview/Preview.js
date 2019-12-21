import React, { Component } from 'react';
import './Preview.scss';
import { socket } from '../../Global/Header';
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
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          xs={12}
          style={{ minHeight: "15vh" }}
          className="top-info"
        >
          <div>
            <span>PIN: { pin }</span>
            <span>{ questionNumber } of { totalNumberOfQuestions }</span>
          </div>
          <div>
            { nickname }
          </div>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "85vh" }}
          className="question-number"
        >
          Question { questionNumber }
        </Grid>
      </Grid>
    )
  }
}
