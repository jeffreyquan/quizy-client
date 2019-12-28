import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AllQuizzes.module.scss';
import Grid from '@material-ui/core/Grid';
import QuizInfo from '../../utils';

export default class AllQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: null
    }
  }

  componentDidMount() {
    QuizInfo.getAllQuizzes().then(({ data }) => {
      this.setState({
        quizzes: data
      })
    })

  }

  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className={ styles.title }
        >
          <h1>QUIZY</h1>
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="flex-start"
          xs={12}
          style={{ minHeight: "90vh" }}
          className={ styles.main }
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            xs={12}
            style={{ minHeight: "10vh" }}
            className={ styles.secondaryHeading }
          >
            <h2>ALL QUIZZES</h2>
            <p>Click on a quiz to preview and host.</p>
          </Grid>
          <Grid
            item
            container
            justify="center"
            alignItems="flex-start"
            xs={12}
            style={{ minHeight: "80vh" }}
          >
            <Index quizzes={ this.state.quizzes } />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const Index = (props) => {
  if (props.quizzes === null) {
    return (<div className={ styles.index}>Loading</div>)
  }

  const publicQuizzes = props.quizzes.map((q) => (
    <Link to={`/quizzes/${ q._id }`}>
      <div className={ styles.tile } key={ q._id }>
        <div>{ q.name }</div>
        <div>{ q.category }</div>
        <div>{ q.questions.length } questions</div>
      </div>
    </Link>
  ))

  return (
    <div className={ styles.index }>
      { publicQuizzes }
    </div>
  )
}
