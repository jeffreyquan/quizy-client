import React, { Component } from 'react';
import { socket } from '../Global/Header';
import Button from '@material-ui/core/Button';

export default class Answer extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      buttonsOn: true
    }
  }

  handleClick = (event) => {
    console.log(event.currentTarget.value);
    this.props.submitAnswer(event.currentTarget.value);
    this.setState({
      buttonsOn: false
    })
  }

  render() {
    if (!this.state.buttonsOn) {
      return (<div>Answer submitted. Waiting for other players.</div>)
    }

    return (
      <div>
        <Button variant="contained" color="primary" value="a" onClick={ this.handleClick }>a</Button>
        <Button variant="contained" color="primary" value="b" onClick={ this.handleClick }>b</Button>
        <Button variant="contained" color="primary" value="c" onClick={ this.handleClick }>c</Button>
        <Button variant="contained" color="primary" value="d" onClick={ this.handleClick }>d</Button>
      </div>
    )
  }
}
