import React, { Component } from 'react';
import styles from './StatusBar.module.scss';
import Grid from '@material-ui/core/Grid';

export default function StatusBar(props) {
  return (
    <Grid
      item
      container
      justify="space-between"
      alignItems="center"
      xs={12}
      style={{ minHeight: "15vh" }}
      className={ styles.status }
    >
      <div className={ styles.left }>
        <div>PIN: { props.pin }</div>
        <QuestionDisplay questionNumber={ props.questionNumber } totalNumberOfQuestions={ props.totalNumberOfQuestions } />
      </div>
      <div style={{ textAlign: "right" }}>{ props.nickname }</div>
    </Grid>
  )
}

const QuestionDisplay = (props) => {

  let component;
  if (props.questionNumber === undefined) {
    return null
  } else {
    component = <div style={{ textAlign: "left" }}>{ props.questionNumber } of { props.totalNumberOfQuestions }</div>
  }

  return (
    <>{ component }</>
  )
}
