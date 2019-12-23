import React, { Component } from 'react';
import StatusBar from '../StatusBar/StatusBar';
import { Redirect } from 'react-router-dom';
import styles from './GetReady.module.scss';
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
    const { pin, nickname } = this.state;
    return(
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <StatusBar
          pin={ pin }
          nickname={ nickname }
        />
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "85vh" }}
          className={ styles.readyBlock }
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
