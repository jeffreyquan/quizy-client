import React, { Component } from 'react';
import Pin from './Pin';
import Button from '@material-ui/core/Button';
import { socket } from '../Global/Header';

export default class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      quizId: '',
      pin: null,
      players: []
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    console.log( quizId );
    this.setState({
      quizId: quizId
    })

    socket.on('connect', () => {

      socket.emit('hostJoin', quizId);

    });

    socket.on('showPin', data => {
      this.setState({
        pin: data.pin
      })
    })

    socket.on('updatePlayersInLobby', players => {
      this.setState({
        players: players
      })
    })
  }

  startGame = () => {
    socket.emit('startGame');
  }

  render() {
    return(
      <div>
        <Pin pin={ this.state.pin } />
        <Players players={ this.state.players }/>
        <Button variant="contained" color="primary" onClick={ this.startGame }>
          Start
        </Button>
      </div>
    )
  }
}

const Players = (props) => {
  if (props.players.length === 0) {
    return (<div>Awaiting players</div>)
  }

  const playerNames = props.players.map((p) => (
    <li key={ p._id }>
      <p>{ p.nickname }</p>
    </li>
  ))


  return (
    <ul>
      { playerNames }
    </ul>
  )
}
