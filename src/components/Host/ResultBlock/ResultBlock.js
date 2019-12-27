import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from './ResultBlock.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';
import CheckIcon from '@material-ui/icons/Check';

export default class ResultBlock extends Component {

  handleClick = () => {
    this.props.nextStep();
    this.props.fetchScoreboard();
  }

  render() {
    const { answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, question, pin } = this.props;

    if (correctAnswer === null) {
      return <div>Results loading</div>
    }

    const sum = answeredA + answeredB + answeredC + answeredD;

    const heightA = 1 + answeredA/sum * 19;
    const heightB = 1 + answeredB/sum * 19;
    const heightC = 1 + answeredC/sum * 19;
    const heightD = 1 + answeredD/sum * 19;

    let aOpacity;
    let bOpacity;
    let cOpacity;
    let dOpacity;

    let aTick = '';
    let bTick = '';
    let cTick = '';
    let dTick = '';

    if (correctAnswer === 'a') {
      aOpacity = 1;
      aTick =  <CheckIcon />;
    } else if (correctAnswer === 'b') {
      bOpacity = 1;
      bTick = <CheckIcon />;
    } else if (correctAnswer === 'c') {
      cOpacity = 1;
      cTick = <CheckIcon />;
    } else if (correctAnswer === 'd') {
      dOpacity = 1;
      dTick = <CheckIcon />;
    }

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
          direction="column"
          xs={12}
          className={ styles.container }
        >
          <Grid
            item
            container
            alignItems="center"
            xs={12}
            className={ styles.controls }
          >
            <Button variant="contained" color="primary" onClick={ this.handleClick } className={ styles.nextBtn }>
              Next
            </Button>
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            style={{ minHeight: "33.3vh" }}
            className={ styles.main }
          >
            <div className={ styles.chart }>
              <div className={ styles.column }>
                <div className={` ${ styles.red } ${ styles.block } `}>
                  <FavoriteIcon />
                </div>
                <div className={`${ styles.red } ${ styles.bar }`} style={{ height: `${ heightA }rem` }}></div>
                <div className={` ${ styles.redFont } ${ styles.count } `}>{ aTick } { answeredA }</div>
              </div>
              <div className={ styles.column }>
                <div className={` ${ styles.blue } ${ styles.block } `}>
                  <GradeIcon />
                </div>
                <div className={` ${ styles.blue } ${ styles.bar }`} style={{ height: `${ heightB }rem` }}></div>
                <div className={ `${ styles.blueFont } ${ styles.count }` }>{ bTick } { answeredB }</div>
              </div>
              <div className={ styles.column }>
                <div className={ ` ${ styles.orange } ${ styles.block } ` }>
                  <FiberManualRecordRoundedIcon />
                </div>
                <div className={`${ styles.orange } ${ styles.bar }`} style={{ height: `${ heightC }rem` }}></div>
                <div className={ ` ${ styles.count } ${ styles.orangeFont } `}>{ cTick } { answeredC }</div>
              </div>
              <div className={ styles.column }>
                <div className={` ${ styles.green } ${ styles.block }`}>
                  <Brightness3SharpIcon />
                </div>
                <div className={` ${ styles.green } ${ styles.bar }`} style={{ height: `${ heightD }rem` }}></div>
                <div className={` ${ styles.count } ${ styles.greenFont }`}>{ dTick } { answeredD }</div>
              </div>
            </div>
          </Grid>
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
            style={{ opacity: `${ aOpacity }` }}
          >
            <FavoriteIcon className={ styles.icons }/>{ answers.a }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.blue }
            style={{ opacity: `${ bOpacity }` }}
          >
            <GradeIcon className={ styles.icons }/>{ answers.b }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.orange }
            style={{ opacity: `${ cOpacity }` }}
          >
            <FiberManualRecordRoundedIcon className={ styles.icons }/>{ answers.c }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.green }
            style={{ opacity: `${ dOpacity }` }}
          >
            <Brightness3SharpIcon className={ styles.icons }/>{ answers.d }
          </Grid>
        </Grid>
        <Footer pin={ pin }/>
      </Grid>
    )
  }
}
