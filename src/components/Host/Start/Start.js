import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './Start.module.scss';
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
      totalNumberOfQuestions: 0,
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
      const { quizName, totalNumberOfQuestions } = data;
      this.setState({
        quizName: quizName,
        totalNumberOfQuestions: totalNumberOfQuestions
      })

      this.id = setTimeout(() => this.setState({ redirect: true }), 5000);
    });
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    const { quizName, totalNumberOfQuestions, quizId, pin } = this.state;
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
          className={ styles.title }
        >
          <h1>{ quizName }</h1>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "75vh" }}
          className={ styles.main }
        >
          <div className={ styles.questions }>{ totalNumberOfQuestions } Questions</div>
          <div>Are you ready?</div>
        </Grid>
        <Footer pin={ pin } />
        {
          this.state.redirect ?
          <Redirect to={`/gameblock?quizId=${ quizId }&pin=${ pin }`} />
          : null
        }
      </Grid>
    )
  }
}
