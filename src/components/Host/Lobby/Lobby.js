import React, { Component } from 'react';
import styles from './Lobby.module.scss';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { socket } from '../../Global/Header';
import { HOST_JOINED, SHOW_PIN, UPDATE_PLAYERS_IN_LOBBY, HOST_STARTED_GAME } from '../../Events';
import theme from '../Music/theme.mp3';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

export default class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      quizId: null,
      pin: null,
      players: null,
      playersCount: null,
      disabled: true,
      muted: true
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
          players: null,
          playersCount: null
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

  handleMusic = event => {
    event.preventDefault();
    this.setState({
      muted: !this.state.muted
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
      name = <span>Player</span>
    } else {
      name = <span>Players</span>
    }

    let button;
    if (!this.state.muted) {
      button = <button onClick={ this.handleMusic }><VolumeUpIcon /></button>
    } else {
      button = <button onClick={ this.handleMusic }><VolumeOffIcon /></button>
    }

    console.log(this.state);
    return (
      <div className={ styles.main }>
        <div className={ styles.music }>
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
            container
            justify="center"
            alignItems="center"
            xs={12}
            style={{ minHeight: "20vh" }}
            className={ styles.statusBar }
          >
            <div className={ styles.title }>
              <div className={ styles.join }><span>Join at <strong>jeffreyquan.github.io/quizy-client</strong></span></div>
              <div className={ styles.gamePin }>with Game PIN:</div>
              <div className={ styles.pin }>{ this.state.pin }</div>
            </div>
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ minHeight: "10vh", marginTop: "30px" }}
          >
            <Grid
              item
              xs={4}
              style={{ paddingLeft: "5rem" }}
            >
              <div className={ styles.left }>
                <div className={ styles.playersCounter }>
                  <div className={ styles.count }>
                    { this.state.playersCount || 0 }
                  </div>
                  <div className={ styles.player }>
                    { name }
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "center" }}
            >
              <h1 className={ styles.logo }>QUIZY</h1>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "right", paddingRight: "50px" }}
            >
              <Link to={`/start?quizId=${ this.state.quizId }&pin=${ this.state.pin }`}>
                <Button variant="contained" color="primary" className={ styles.startBtn } onClick={ this.startGame } disabled={ this.state.disabled } style={{ fontSize: "1.6rem" }}>
                  Start
                </Button>
              </Link>
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

  if (props.players === null || props.playersCount === null) {
    return null
  }

  const playerNames = props.players.map((p, i) => (
    <div key={ p._id }>
      { p.nickname }
    </div>
  ))

  return (
    <div className={ styles.names }>
      { playerNames }
    </div>
  )
}
