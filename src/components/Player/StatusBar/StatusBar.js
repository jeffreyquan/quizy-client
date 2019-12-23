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
      <div>
        <span>PIN: { props.pin }</span>
        <QuestionDisplay questionNumber={ props.questionNumber } totalNumberOfQuestions={ props.totalNumberOfQuestions } />
      </div>
      <div>{ props.nickname }</div>
    </Grid>
  )
}

const QuestionDisplay = (props) => {

  let component;
  if (props.questionNumber === undefined) {
    return null
  } else {
    component = <span style={{ paddingLeft:"2rem" }}>{ props.questionNumber } of { props.totalNumberOfQuestions }</span>
  }

  return (
    <>{ component }</>
  )
}
