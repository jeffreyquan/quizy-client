import React, { Component } from 'react';
import styles from './QuizDetailsForm.module.scss';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { MuiThemeProvider, createMuiTheme, withStyles  } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
});

const QuizDetailsInput = withStyles(theme => ({
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

export default class QuizDetailsForm extends Component {

  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
        <Grid
          item
          md={4}
          sm={12}
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '25vh' }}
        >
          <Grid item xs={12} style={{ textAlign: "center"}}>
            <h3>Enter quiz details:</h3>
          </Grid>
          <Grid item xs={12}>
            <QuizDetailsInput
              placeholder="Name"
              name="name"
              value={ values.name }
              onChange={ handleChange }
              margin="dense"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <QuizDetailsInput
              placeholder="Category"
              name="category"
              value={ values.category }
              onChange={ handleChange }
              margin="dense"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
                onClick={ this.continue }
                fullWidth
                className={ styles.continueBtn }
              >
                Continue
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </>
    )
  }
}
