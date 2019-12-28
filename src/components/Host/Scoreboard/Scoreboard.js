import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Grid from '@material-ui/core/Grid';
import styles from './Scoreboard.module.scss';
import Button from '@material-ui/core/Button';
import { socket } from '../../Global/Header';

export default class Scoreboard extends Component {

  finishGame = () => {
    this.props.endGame();
  }

  handleClick = () => {
    this.props.nextQuestion();
    const data = {
      pin: this.props.pin,
      questionNumber: this.props.questionNumber + 1
    }
    socket.emit("FETCH_NEXT_QUESTION", data);
  }

  render () {

    let body;
    if (this.props.rankedPlayers.length === 0) {
      body = <div className={ styles.loading }>Loading scoreboard</div>
    } else {
      body = <Rankings playerRanks={ this.props.rankedPlayers } />
    }

    const { pin, questionNumber, totalNumberOfQuestions } = this.props;

    let button;
    if (questionNumber !== totalNumberOfQuestions) {
      button = <Button variant="contained" color="primary" onClick={ this.handleClick } className={ styles.nextBtn }>Next</Button>
    } else {
      button = <Button variant="contained" color="primary" onClick={ this.finishGame } className={ styles.nextBtn }>End</Button>
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
          <h1>Scoreboard</h1>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xs={12}
          style={{ minHeight: "79.5vh" }}
          className={ styles.container }
        >
          <Grid
            item
            container
            alignItems="center"
            xs={12}

            className={ styles.controls }
          >
            { button }
          </Grid>
          { body }
        </Grid>
        <Footer pin={ pin }/>
      </Grid>
    )
  }
}

const Rankings = (props) => {

  const playerRankings = props.playerRanks.map((r, i) => (
    <Grid
      item
      container
      justify="space-between"
      alignItems="center"
      xs={12}
      className={ styles.rank }
      key={ i }
    >
      <div className={ styles.nickname }>{ r.nickname }</div>
      <div className={ styles.score }>{ r.score }</div>
    </Grid>
  ))

  return (
    <Grid
      item
      container
      justify="center"
      alignItems="center"
      xs={8}
      md={6}
      style={{ minHeight: "10vh" }}
      className={ styles.scoreboard }
    >
      { playerRankings }
    </Grid>
  )
}
