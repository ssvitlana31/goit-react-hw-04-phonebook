import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './Form.styled';
import { nanoid } from 'nanoid';

export const InputContacts = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      number: number.trim(),
      name: name.trim(),
      id: nanoid(),
    };

    if (!name.trim()) {
      return;
    }

    onAddContact(contact);

    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            onChange={handleInputChange}
            value={name}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number:
          <Input
            onChange={handleInputChange}
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
};

InputContacts.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
