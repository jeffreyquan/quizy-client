import React, { Component } from 'react';
import './QuestionBlock.css';
import { socket } from '../Global/Header';
import { QUESTION_END, FETCH_TIME, TIME, UPDATE_PLAYERS_ANSWERED } from '../Events';
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
          className="top-question"
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
          className="controls"
        >
          <div className="time">{ this.state.time }</div>
          <div className="answer-count">{ this.state.playersAnswered }{ name }</div>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "30vh" }}
          className="host-answers"
        >
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            style={{ backgroundColor: "rgba(244, 67, 54, 1)", minHeight: "15vh", border: "1px solid white", padding: "5px" }}
          >
            <FavoriteIcon style={{ color: "white", fontSize: 40 }} />{ answers.a }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            style={{ backgroundColor: "rgba(63, 81, 181, 1)", minHeight: "15vh", border: "1px solid white", padding: "5px" }}
          >
            <GradeIcon style={{ color: "white", fontSize: 40 }} />{ answers.b }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            style={{ backgroundColor: "rgba(255, 152, 0, 1)", minHeight: "15vh", border: "1px solid white", padding: "5px" }}
          >
            <FiberManualRecordRoundedIcon style={{ color: "white", fontSize: 40 }} />{ answers.c }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            style={{ backgroundColor: "rgba(76, 175, 80, 1)", minHeight: "15vh", border: "1px solid white", padding: "5px"  }}
          >
            <Brightness3SharpIcon style={{ color: "white", fontSize: 40 }} />{ answers.d }
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className="footer"
        >
          <div>Game PIN: <span style={{ fontWeight: "800" }}>{ pin }</span></div>
        </Grid>
      </Grid>
    )
  }
}
