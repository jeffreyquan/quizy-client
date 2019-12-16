import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pin from '../Global/Pin';
import Button from '@material-ui/core/Button';
import { socket } from '../Global/Header';
import { HOST_JOINED, SHOW_PIN, UPDATE_PLAYERS_IN_LOBBY, HOST_STARTED_GAME } from '../Events';

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

    socket.emit(HOST_JOINED, quizId);

    socket.on(SHOW_PIN, data => {
      this.setState({
        pin: data.pin
      })
    })

    socket.on(UPDATE_PLAYERS_IN_LOBBY, players => {
      this.setState({
        players: players
      })
    })
  }

  startGame = () => {
    socket.emit(HOST_STARTED_GAME, this.state.pin);
  }

  render() {
    return(
      <div>
        <Pin pin={ this.state.pin } />
        <Players players={ this.state.players }/>
        <Link to={`/start?quizId=${ this.state.quizId }&pin=${ this.state.pin }`}>
          <Button variant="contained" color="primary" onClick={ this.startGame }>
            Start
          </Button>
        </Link>
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
