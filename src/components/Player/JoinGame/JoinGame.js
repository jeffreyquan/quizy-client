import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './JoinGame.scss';
import { MuiThemeProvider, createMuiTheme, withStyles  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { socket } from '../../Global/Header';
import { PLAYER_JOINED, NICKNAME_TAKEN, GAME_NOT_FOUND, PLAYER_JOINED_SUCCESSFULLY } from '../../Events';

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
});

const JoinGameInput = withStyles(theme => ({
  root: {
    '& input:invalid + fieldset': {
     borderColor: 'red',
     borderWidth: 2,
   },
 },
  input: {
    margin: "1rem 0",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      borderColor: theme.palette.common.black
    },
    '&:focus': {
      borderColor: theme.palette.common.black
    },
  },
}))(InputBase);

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
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClick = event => {
    this.setState({
      disabled: true
    })

    setTimeout(() => this.setState({
      disabled: false
    }), 500);

  }

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    socket.emit(PLAYER_JOINED, {
      nickname: nickname,
      pin: pin
    });
  }

  componentDidMount() {
    socket.on(NICKNAME_TAKEN, () => {
      console.log("Nickname taken");
      this.setState({
        message: "Nickname taken"
      })

      setTimeout(() => this.setState({
        message: null
      }), 3000);
    })

    socket.on(GAME_NOT_FOUND, () => {
      console.log('Game not found...');
      this.setState({
        message: "Not found"
      })

      setTimeout(() => this.setState({
        message: null
      }), 3000);

    });

    socket.on(PLAYER_JOINED_SUCCESSFULLY, data => {
      this.props.history.push(`/instructions?nickname=${ this.state.nickname }&pin=${ this.state.pin }`)
    })
  }

  render() {
    let error;
    if (this.state.message === null) {
      error = null
    } else if (this.state.message === "Not found") {
      error = <div className="error"><div>We didn't recognise the game pin.</div>Please check and try again.</div>
    } else if (this.state.message === "Nickname taken") {
      error = <div className="error">Sorry, that nickname is taken.</div>
    }

    return (
      <div className="home">
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <div>
            <h1 className="main-title">QUIZY</h1>
          </div>
          <div className="vertical-main-form">
            <form onSubmit={ this.handleSubmit }>
              <JoinGameInput
                placeholder="NICKNAME"
                name="nickname"
                value={ this.state.nickname || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required
                fullWidth
              />
              <JoinGameInput
                placeholder="GAME PIN"
                name="pin"
                value={ this.state.pin || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required
                fullWidth
              />
              <MuiThemeProvider theme={ darkGreyTheme }>
                <Button
                  style={{
                    fontSize: "1.6rem",
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: "1rem 0"
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
          </div>
          <div style={{ minHeight: "6rem", margin: "1rem 0" }}>
            { error }
          </div>
          <div>
            <p style={{ color: "white" }}>Create your own quiz <Link to="/quizzes/new" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>here</Link>.</p>
          </div>
        </Grid>
      </div>
    )
  }
}
