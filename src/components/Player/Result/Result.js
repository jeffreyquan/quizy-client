import React, { Component } from 'react';
import { socket } from '../../Global/Header';

export default class Results extends Component {

  render () {
    const correct = this.props.lastCorrect;
    let showResult;

    if (correct) {
      showResult = <div>Correct</div>
    } else {
      showResult = <div>Incorrect</div>
    }

    const streak = this.props.streak;
    let showStreak;

    if (streak > 0) {
      showStreak = <div>{`Your streak is ${ streak }`}</div>
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

    return (
      <div>
        <div>{ showResult }</div>
        <div>{ showStreak }</div>
        <div>{ showRank }</div>
      </div>
    )
  }
}
