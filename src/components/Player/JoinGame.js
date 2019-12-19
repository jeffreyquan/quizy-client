import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './JoinGame.css';
import { MuiThemeProvider, createMuiTheme, withStyles  } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { socket } from '../Global/Header';
import { PLAYER_JOINED, GAME_NOT_FOUND, PLAYER_JOINED_SUCCESSFULLY } from '../Events';

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
})

export default class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      nickname: null,
      pin: null,
      message: null,
      disabled: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClick = event => {
    this.setState({
      disabled: true
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    socket.emit(PLAYER_JOINED, {
      nickname: nickname,
      pin: pin
    });

    socket.on(GAME_NOT_FOUND, () => {
      console.log('Game not found...');
      this.setState({
        message: 'Game not found.'
      })

      setTimeout(() => this.setState({
        message: null
      }), 2000);

    });

    socket.on(PLAYER_JOINED_SUCCESSFULLY, data => {
      this.props.history.push(`/instructions?nickname=${ this.state.nickname }&pin=${ this.state.pin }`)
    })
  }

  render() {
    let error;
    if (this.state.message === null) {
      error = <div></div>
    } else {
      error = <div>We didn't recognise the game pin. Please check and try again.</div>
    }
    return (
      <div className="home">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item lg={2} md={3} xs={5}>
            <h1 className="main-title">QUIZY</h1>
          </Grid>
          <Grid item lg={2} md={3} xs={5}>
            <form onSubmit={ this.handleSubmit }>
              <TextField
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black"
                  }
                }}
                placeholder="NICKNAME"
                name="nickname"
                value={ this.state.nickname || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required fullWidth
              />
              <TextField
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "black"
                  }
                }}
                placeholder="GAME PIN"
                name="pin"
                value={ this.state.pin || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required fullWidth
              />
              <MuiThemeProvider theme={ darkGreyTheme }>
                <Button
                  style={{
                    fontWeight: "bold"
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={ this.state.disabled }
                
                  fullWidth
                >
                  Enter
                </Button>
              </MuiThemeProvider>
            </form>
          </Grid>
          <Grid item lg={2} md={3} xs={5}>
            { error }
          </Grid>
          <Grid item lg={2} md={3} xs={5}>
            <p style={{ color: "white" }}>Create your own quiz <Link to="/quizzes/new" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>here</Link>.</p>
          </Grid>
        </Grid>
      </div>
    )
  }
}
