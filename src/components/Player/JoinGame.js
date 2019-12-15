import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { socket } from '../Global/Header';

export default class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      pin: '',
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
    console.log('Enter button working...');
    socket.emit('playerJoin', this.state);
  }

  // socket.on('gameNotFound', () => {
  //   console.log('Game not found...');
  // });


  render() {
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
      </div>
    )
  }
}
