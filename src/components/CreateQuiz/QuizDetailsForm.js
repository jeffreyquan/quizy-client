import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default class QuizDetailsForm extends Component {
  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <h1>Enter quiz details:</h1>
        <TextField
          name="name"
          placeholder="Name"
          onChange={ handleChange }
          value={ values.name }
          required
        />
        <br/>
        <TextField
          name="category"
          placeholder="Category"
          onChange={ handleChange }
          value={ values.category }
        />
        <br/>
        <Button variant="contained" color="primary" onClick={ this.continue }>
          Continue
        </Button>
      </div>
    )
  }
}
