import React, { Component } from 'react';
import StatusBar from '../StatusBar/StatusBar';
import styles from './Answer.module.scss';
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

  handleClick = event => {
    console.log('Player has submitted answer:', event.currentTarget.value);
    this.props.submitAnswer(event.currentTarget.value);
    this.setState({
      buttonsOn: false
    })
  }

  render() {

    const { pin, nickname, questionNumber, totalNumberOfQuestions } = this.props;

    let body;

    if (!this.state.buttonsOn) {
      body = <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "90vh" }}
        className={ styles.answerSubmitted }
      >
        <div>Answer submitted. Waiting for other players.</div>
      </Grid>
    } else {
      body = <Grid
        item
        container
        spacing={1}
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "90vh" }}
        className={ styles.answerBlock }
      >
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.red } value="a" onClick={ this.handleClick } fullWidth>
            <FavoriteIcon className={ styles.icons } />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.blue } value="b" onClick={ this.handleClick } fullWidth>
            <GradeIcon className={ styles.icons }  />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.orange } value="c" onClick={ this.handleClick } fullWidth>
            <FiberManualRecordRoundedIcon className={ styles.icons } />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.green } value="d" onClick={ this.handleClick } fullWidth>
            <Brightness3SharpIcon className={ styles.icons } />
          </Button>
        </Grid>
      </Grid>
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <StatusBar
          pin={ pin }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nickname={ nickname }
        />
       { body }
      </Grid>
    )
  }
}
