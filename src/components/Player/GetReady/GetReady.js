import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './GetReady.scss';
import Grid from '@material-ui/core/Grid';

export default class GetReady extends Component {
  constructor(props) {
    super(props);
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
    console.log('Get ready page for player in room:', pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })

    this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
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
        {
          this.state.redirect ?
          <Redirect to={`/playblock?nickname=${ this.state.nickname }&pin=${ this.state.pin }`} />
          : null
        }
      </Grid>
    )
  }
}
