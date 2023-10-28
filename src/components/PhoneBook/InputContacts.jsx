import React from 'react';
import PropTypes from 'prop-types';

import { Form, Label, Input, Button } from './Form.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class InputContacts extends React.Component {
  state = INITIAL_STATE;

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();
    this.props.onAddContact({
      name,
      number,
    });

    this.setState(INITIAL_STATE);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <Form action="" onSubmit={this.handleSubmit}>
          <Label htmlFor="">
            Name:
            <Input
              onChange={this.handleInputChange}
              value={name}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <Label htmlFor="">
            Number:
            <Input
              onChange={this.handleInputChange}
              value={number}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>
          <Button>Add contact</Button>
        </Form>
      </>
    );
  }
}

InputContacts.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
