import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { socket } from '../../Global/Header';
import { FETCH_NEXT_QUESTION } from '../../Events';

export default class Scoreboard extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  finishGame = () => {
    this.props.endGame();
  }

  handleClick = () => {
    this.props.nextQuestion();
    const data = {
      pin: this.props.pin,
      questionNumber: this.props.questionNumber + 1
    }
    socket.emit(FETCH_NEXT_QUESTION, data);
    console.log('Host fetching next question.......');
  }

  render () {
    if (this.props.rankedPlayers.length === 0) {
      return <div>Loading scoreboard</div>
    }

    let button;
    console.log('Game status is: ', this.props.gameStatus);
    if (this.props.gameStatus) {
      button = <Button variant="contained" color="primary" onClick={ this.handleClick }>Next</Button>
    } else {
      button = <Button variant="contained" color="primary" onClick={ this.finishGame }>End</Button>
    }
    return (
      <div>
        <h1>Scorboard</h1>
        <Rankings playerRanks={ this.props.rankedPlayers } />
        { button }
      </div>
    )
  }
}

const Rankings = (props) => {

  const playerRankings = props.playerRanks.map((r, i) => (
    <div key={ i }>
      { r.rank } - { r.nickname } - { r.score }
    </div>
  ))

  return (
    <div>
      { playerRankings }
    </div>
  )
}
