import React, { Component } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

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
          container
          alignItems="center"
          justify="center"
        >
          <Grid item md={4} sm={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="center"
              style={{ minHeight: '25vh' }}
            >
              <Grid item xs={12} style={{ textAlign: "center"}}>
                <h1>Enter quiz details:</h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  onChange={ handleChange }
                  value={ values.name }
                  margin="dense"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Category"
                  name="category"
                  onChange={ handleChange }
                  value={ values.category }
                  margin="dense"
                  variant="filled"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" onClick={ this.continue }>
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}
