import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { socket } from '../../Global/Header';
import './Instructions.scss';
import Grid from '@material-ui/core/Grid';
import { GAME_HAS_STARTED } from '../../Events';

export default class Instructions extends Component {
  constructor() {
    super();
    this.state = {
      nickname: null,
      pin: null,
      redirect: false
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const pin = parsed.pin;
    console.log('Instruction page for player in room:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    socket.on(GAME_HAS_STARTED, () => {
      this.setState({
        redirect: true
      })
   })
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          xs={12}
          style={{ minHeight: "15vh" }}
          className="info"
        >
          <div>PIN: { this.state.pin }</div>
          <div>{ this.state.nickname }</div>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={4}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "85vh" }}
          className="main-info"
        >
          <Grid
            item
            xs={12}
            className="in"
          >
            You're in
          </Grid>
          <Grid
            item
            xs={12}
            className="name"
          >
            See your nickname on screen?
          </Grid>
        </Grid>
        {
          this.state.redirect ?
          <Redirect to={`/getready?nickname=${ this.state.nickname }&pin=${ this.state.pin }`} />
          : null
        }
      </Grid>
    )
  }
}
