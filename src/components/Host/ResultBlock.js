import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Button from '@material-ui/core/Button';

export default class ResultBlock extends Component {

  render() {
    const { answers, answeredA, answeredB, answeredC, answeredD, correct } = this.props;
    return (
      <div>
        <div>Correct: { correct }</div>
        <div>{ answeredA } answered A</div>
        <div>{ answeredB } answered B</div>
        <div>{ answeredC } answered C</div>
        <div>{ answeredD } answered D</div>
        <div>{ answers.a }</div>
        <div>{ answers.b }</div>
        <div>{ answers.c }</div>
        <div>{ answers.d }</div>
        <Button variant="contained" color="primary" onClick={() => this.props.onNext() }>
          Next
        </Button>
      </div>
    )
  }
}
