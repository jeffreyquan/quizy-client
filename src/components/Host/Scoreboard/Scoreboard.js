import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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
