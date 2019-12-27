import React from 'react';
import styles from './Gameover.module.scss';
import Grid from '@material-ui/core/Grid';
import { socket } from '../../Global/Header';

export default function Gameover(props) {

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
      className={ styles.container }
    >
      <Grid
        item
        container
        xs={12}
        justify="center"
        alignItems="center"
        style={{ minHeight: "15vh"}}
        className={ styles.title }
      >
        <div className={ styles.name }>{ props.quizName }</div>
      </Grid>
      <FinalRankings rankings={ props.finalRankings } totalNumberOfQuestions={ props.totalNumberOfQuestions } />
      <Grid
        item
        xs={12}
        justify="center"
        alignItems="center"
        style={{ minHeight: "10vh"}}
        className={ styles.ground }
      >
      </Grid>
    </Grid>
  )
}

const FinalRankings = (props) => {

  const [first, second, third] = props.rankings;

  const firstDiv =
  <div className={ styles.column }>
    <div className={ styles.firstBar }>
      <div>
        { first.score }
      </div>
      <div>
        { first.totalCorrect } out of { props.totalNumberOfQuestions }
      </div>
    </div>
    <div className={ styles.nickname }>
      { first.nickname }
    </div>
  </div>

  let secondDiv;

  if (second) {
    secondDiv =
    <div className={ styles.column }>
      <div className={ styles.secondBar }>
        <div>
          { second.score }
        </div>
        <div>
          { second.totalCorrect } out of { props.totalNumberOfQuestions }
        </div>
      </div>
      <div className={ styles.nickname }>
        { second.nickname }
      </div>
    </div>
  } else {
    secondDiv =
    <div className={ styles.column }>
      <div className={ styles.secondBar }>
      </div>
    </div>
  }

  let thirdDiv;

  if (third) {
    thirdDiv =
    <div className={ styles.column }>
      <div className={ styles.thirdBar }>
        <div>
          { third.score }
        </div>
        <div>
          { third.totalCorrect } out of { props.totalNumberOfQuestions }
        </div>
      </div>
      <div className={ styles.nickname }>
        { third.nickname }
      </div>
    </div>
  } else {
    thirdDiv =
    <div className={ styles.column}>
      <div className={ styles.thirdBar }>
      </div>
    </div>
  }

  return (
    <Grid
      item
      container
      xs={12}
      alignItems="flex-end"
      justify="center"
      style={{ minHeight: "75vh" }}
      className={ styles.main }
    >
      <div className={ styles.podiums }>
        { secondDiv }
        { firstDiv }
        { thirdDiv }
      </div>
    </Grid>
  )
}
