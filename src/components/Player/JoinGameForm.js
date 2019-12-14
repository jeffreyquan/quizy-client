import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@material-ui/core';

export default class JoinGameForm extends Component {
  constructor() {
    super();
    this.state = {
      pin: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item md={4} sm={12}>
            <TextField margin="dense" name="pin" value={ this.state.pin } onChange={ this.handleChange } variant="outlined" placeholder="Game PIN" fullWidth/>
          </Grid>
          <Grid item md={4} sm={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Enter
            </Button>
          </Grid>
          <Grid item md={4} sm={12}>
            <Link to="/login">Login to create your own quizy</Link>
          </Grid>
        </Grid>
      </form>
    )
  }
}
