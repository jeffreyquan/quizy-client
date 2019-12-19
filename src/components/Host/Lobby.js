import React, { Component } from 'react';
import './Lobby.css';
import { Link } from 'react-router-dom';
import Pin from '../Global/Pin';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { socket } from '../Global/Header';
import { HOST_JOINED, SHOW_PIN, UPDATE_PLAYERS_IN_LOBBY, HOST_STARTED_GAME } from '../Events';
import theme from './theme.mp3';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

export default class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      quizId: '',
      pin: null,
      players: [],
      playersCount: 0,
      disabled: true,
      muted: false
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

    socket.on(UPDATE_PLAYERS_IN_LOBBY, playersData => {
      console.log(playersData);
      if (playersData.playersCount === 0) {
        this.setState({
          players: [],
          playersCount: 0
        })
      } else {
        this.setState({
          players: playersData.players,
          playersCount: playersData.playersCount,
          disabled: false
        })
      }
    })
  }

  musicOff = event => {
    event.preventDefault();
    this.setState({
      muted: true
    })
  }

  musicOn = event => {
    event.preventDefault();
    this.setState({
      muted: false
    })
  }

  startGame = () => {
    console.log('Starting game.');
    socket.emit(HOST_STARTED_GAME, this.state.pin);
  }

  componentWillUnmount() {
    socket.off(SHOW_PIN);
    socket.off(UPDATE_PLAYERS_IN_LOBBY);
  }

  render() {
    let name;
    if (this.state.playersCount === 1) {
      name = <span>player</span>
    } else {
      name = <span>players</span>
    }

    let button;
    if (!this.state.muted) {
      button = <a onClick={ this.musicOff } href="#"><VolumeOffIcon style={{ color: "rgba(255, 255, 255, 1)" }}/></a>
    } else {
      button = <a onClick={ this.musicOn }><VolumeUpIcon style={{ color: "rgba(255, 255, 255, 1)" }}/></a>
    }

    console.log(this.state);
    return (
      <div className="main">
        <div className="music">
          { button }
        </div>
        <div>
          <audio ref="audio_tag" src={ theme } autoPlay muted={ this.state.muted }/>
        </div>
        <Grid
          container
          direction="column"
        >
          <Grid
            item
            xs={12}
            style={{ minHeight: "20vh" }}
          >
            <div className="title">
              <h1 className="join">Join with Game PIN: </h1>
              <h1 className="pin">{ this.state.pin }</h1>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "30px" }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ minHeight: "10vh" }}
            >
              <Grid
                item
                xs={4}
                style={{ paddingLeft: "50px" }}
              >
                <div className="players-count">
                  { this.state.playersCount } { name }
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ textAlign: "center" }}
              >
                <h1 className="logo">QUIZY</h1>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ textAlign: "right", paddingRight: "50px" }}
              >
                <Link to={`/start?quizId=${ this.state.quizId }&pin=${ this.state.pin }`}>
                  <Button variant="contained" color="primary" className="start-btn" onClick={ this.startGame } disabled={ this.state.disabled }>
                    Start
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Players players={ this.state.players } playersCount={ this.state.playersCount }/>
          </Grid>
          <Grid>

          </Grid>
        </Grid>
      </div>
    )
  }
}

const Players = (props) => {
  console.log(props);
  if (props.playersCount === 0) {
    return null
  }

  const playerNames = props.players.map((p) => (
    <li key={ p._id }>
      <p>{ p.nickname }</p>
    </li>
  ))


  return (
    <ul className="names">
      { playerNames }
    </ul>
  )
}
