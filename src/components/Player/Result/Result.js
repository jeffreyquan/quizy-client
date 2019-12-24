import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import StatusBar from '../StatusBar/StatusBar';
import styles from './Result.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export default class Results extends Component {

  render () {
    const correct = this.props.lastCorrect;
    let showResult;

    if (correct) {
      showResult =
      <div>
        <div>Correct</div>
        <div>
          <CheckIcon style={{ color:"white", fontSize: 100 }}/>
        </div>
      </div>
    } else {
      showResult =
      <div>
        <div>Incorrect</div>
        <div>
          <CloseIcon style={{ color:"white", fontSize: 100 }}/>
        </div>
      </div>
    }

    const streak = this.props.streak;
    let showStreak;

    if (streak > 0) {
      showStreak =
      <div style={{ display: "flex" }}>
        <div>Answer streak</div>
        <div className={ styles.streakNumber }>{ streak }</div>
      </div>
    } else {
      showStreak = <></>
    }

    const rank = this.props.rank;
    let showRank;

    if (rank === 1) {
      showRank = <div>You are in 1st place</div>
    } else if (rank === 2) {
      showRank = <div>You are in 2nd place</div>
    } else if (rank === 3) {
      showRank = <div>You are in 3rd place</div>
    } else {
      showRank = <div>{`You are in ${ rank }th place`}</div>
    }
    const { pin, questionNumber, totalNumberOfQuestions } = this.props;
    return (
      <div>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <StatusBar
            pin={ pin }
            questionNumber={ questionNumber }
            totalNumberOfQuestions={ totalNumberOfQuestions }
            nickname="jeffrey"
          />
          <Grid
            item
            container
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "85vh", textAlign: "center" }}
            className={ correct ? styles.correct :  styles.incorrect }
          >
            <div className={ styles.result }>{ showResult }</div>
            <div className={ styles.streak }>{ showStreak }</div>
            <div className={ styles.rank }>{ showRank }</div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
