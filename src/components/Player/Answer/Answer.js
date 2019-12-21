import React, { Component } from 'react';
import './Answer.scss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';

export default class Answer extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      buttonsOn: true
    }
  }

  handleClick = (event) => {
    console.log('Player has submitted answer:', event.currentTarget.value);
    this.props.submitAnswer(event.currentTarget.value);
    this.setState({
      buttonsOn: false
    })
  }

  render() {
    if (!this.state.buttonsOn) {
      return (<div>Answer submitted. Waiting for other players.</div>)
    }

    const { pin, nickname, questionNumber, totalNumberOfQuestions } = this.props;

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
          className="answers-top-info"
        >
          <div>
            <span>PIN: { pin }</span>
            <span>{ questionNumber } of { totalNumberOfQuestions }</span>
          </div>
          <div>
            { nickname }
          </div>
        </Grid>
        <Grid
          item
          container
          spacing={1}
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "85vh" }}
          className="answer-block"
        >
          <Grid
            item
            xs={6}
          >
            <Button variant="contained" style={{ backgroundColor: "rgba(244, 67, 54, 1)", minHeight: "42vh" }} value="a" onClick={ this.handleClick } fullWidth>
              <FavoriteIcon style={{ color: "white", fontSize: 50 }} />
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Button variant="contained" style={{ backgroundColor: "rgba(63, 81, 181, 1)", minHeight: "42vh" }} value="b" onClick={ this.handleClick } fullWidth>
              <GradeIcon style={{ color: "white", fontSize: 50 }} />
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Button variant="contained" style={{ backgroundColor: "rgba(255, 152, 0, 1)", minHeight: "42vh" }} value="c" onClick={ this.handleClick } fullWidth>
              <FiberManualRecordRoundedIcon style={{ color: "white", fontSize: 50 }} />
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Button variant="contained" style={{ backgroundColor: "rgba(76, 175, 80, 1)", minHeight: "42vh" }} value="d" onClick={ this.handleClick } fullWidth>
              <Brightness3SharpIcon style={{ color: "white", fontSize: 50 }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
