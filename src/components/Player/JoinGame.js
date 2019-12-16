import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { socket } from '../Global/Header';
import { PLAYER_JOINED, GAME_NOT_FOUND, PLAYER_JOINED_SUCCESSFULLY } from '../Events';

export default class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      pin: '',
      message: null
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    socket.emit(PLAYER_JOINED, {
      nickname: nickname,
      pin: pin 
    });

    socket.on(GAME_NOT_FOUND, () => {
      console.log('Game not found...');
      this.setState({
        message: 'Game not found.'
      })

      setTimeout(() => this.setState({
        message: null
      }), 2000);

    });

    socket.on(PLAYER_JOINED_SUCCESSFULLY, () => {
        this.props.history.push({
          pathname: `/instructions`,
          state: {
            pin: this.state.pin,
            nickname: this.state.nickname
          }
        })
    })
  }

  render() {
    let error;
    if (this.state.message === null) {
      error = <div></div>
    } else {
      error = <div>We didn't recognise the game pin. Please check and try again.</div>
    }
    return (
      <div>
        <p>Making sure works</p>
        <form onSubmit={ this.handleSubmit }>
          <TextField label="Nickname" name="nickname" value={ this.state.nickname } onChange={ this.handleChange } margin="dense" variant="filled" required/>
          <TextField label="Game pin" name="pin" value={ this.state.pin } onChange={ this.handleChange } margin="dense" variant="filled" required/>
          <Button variant="contained" color="primary" type="submit">
            Enter
          </Button>
        </form>
        { error }
      </div>
    )
  }
}
