import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import styles from './QuestionBlock.module.scss';
import { socket } from '../../Global/Header';
import { QUESTION_END, FETCH_TIME, TIME, UPDATE_PLAYERS_ANSWERED } from '../../Events';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';

export default class QuestionBlock extends Component {
  constructor() {
    super();
    this.state = {
      time: 20,
      playersAnswered: 0,
      intervalId: ''
    }
  }

  timer = () => {
    this.setState({
      time: this.state.time - 1
    })

    if (this.state.time <= 0 ) {
      clearInterval(this.state.intervalId);
      const pin = this.props.pin;
      socket.emit(QUESTION_END, pin);
      this.props.nextStep();
    }
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer, 1000);
    this.setState({
      intervalId: intervalId
    })

    socket.on(UPDATE_PLAYERS_ANSWERED, playersAnswered => {
      this.setState({
        playersAnswered: playersAnswered
      })
    })

    socket.on(FETCH_TIME, playerId => {

      const data = {
        pin: this.props.pin,
        playerId: playerId,
        time: this.state.time
      }

      socket.emit(TIME, data);
    })
  }

  componentWillUnmount() {
    // WORKS MORE EFFICIENTLY WITHOUT THESE? CHECK AGAIN.
    // socket.off(UPDATE_PLAYERS_ANSWERED);
    // socket.off(FETCH_TIME);
    clearInterval(this.state.intervalId);
  }

  render() {
    let name;
    if (this.state.playersAnswered === 1) {
      name = <span>answer</span>
    } else {
      name = <span>answers</span>
    }

    const { pin, question, answers } = this.props;
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
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "20vh" }}
          className={ styles.question }
        >
          <h1>{ question }</h1>
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          xs={12}
          style={{ minHeight: "40vh" }}
          className={ styles.controls }
        >
          <div className={ styles.time }>{ this.state.time }</div>
          <div className={ styles.right }>
            <div className={ styles.answersCounter }>
              <div className={ styles.count }>{ this.state.answerCount || 0 }</div>
              <div className={ styles.answer }>
                { name }
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "30vh" }}
          className={ styles.answers }
        >
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.red }
          >
            <FavoriteIcon className={ styles.icons }/>{ answers.a }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.blue }
          >
            <GradeIcon className={ styles.icons }/>{ answers.b }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.orange }
          >
            <FiberManualRecordRoundedIcon className={ styles.icons }/>{ answers.c }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.green }
          >
            <Brightness3SharpIcon className={ styles.icons }/>{ answers.d }
          </Grid>
        </Grid>
        <Footer pin={ pin }/>
      </Grid>
    )
  }
}
