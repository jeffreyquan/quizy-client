import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Start.scss';
import { socket } from '../../Global/Header';
import { GAME_INTRO, FETCH_INTRO } from '../../Events';
import Grid from '@material-ui/core/Grid';

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      pin: 0,
      quizId: '',
      quizName: null,
      numberOfQuestions: 0,
      redirect: false
    };
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    console.log( pin );
    this.setState({
      pin: pin,
      quizId: quizId
    })

    socket.emit(FETCH_INTRO, pin);

    socket.on(GAME_INTRO, data => {
      console.log( data );
      const { quizName, numberOfQuestions } = data;
      this.setState({
        quizName: quizName,
        numberOfQuestions: numberOfQuestions
      })

      this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
    });
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
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "15vh" }}
          className="title"
        >
          <h1>{ this.state.quizName }</h1>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "75vh" }}
          className="middle"
        >
          <div className="questions">{ this.state.numberOfQuestions} Questions</div>
          <div>Are you ready?</div>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className="footer"
        >
          <div>Game PIN: <span style={{ fontWeight: "800" }}>{ this.state.pin }</span></div>
        </Grid>
        {
          this.state.redirect ?
          <Redirect to={`/gameblock?quizId=${ this.state.quizId }&pin=${ this.state.pin }`} />
          : null
        }
      </Grid>
    )
  }
}
