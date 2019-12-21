import React, { Component } from 'react';
import './GetReady.scss';
import Grid from '@material-ui/core/Grid';

export default class GetReady extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      pin: null
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const pin = parsed.pin;
    console.log('Get ready page for player in room:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    setTimeout(() => {
      this.props.history.push(`/playblock?nickname=${ this.state.nickname }&pin=${ this.state.pin }`)
    }, 5000);
  }

  render() {
    return(
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
          alignItems="center"
          justify="center"
          style={{ minHeight: "85vh" }}
          className="ready-block"
        >
          Get ready
        </Grid>
      </Grid>
    )
  }
}
