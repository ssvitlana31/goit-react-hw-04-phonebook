import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { InputContacts } from './PhoneBook/InputContacts.jsx';
import { Contacts } from './PhoneBook/ContactsList';
import { Filter } from './PhoneBook/Filter';
import { Container, Title } from './PhoneBook/Form.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  // const contacts = JSON.parse(window.localStorage.getItem('contacts'));
  // if (contacts?.length) {
  //   this.setState({ contacts });
  // }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     window.localStorage.setItem(
  //       'contacts',
  //       JSON.stringify(this.state.contacts)
  //     );
  //   }
  //   if (prevState.filter !== this.state.filter) {
  //     window.localStorage.setItem('filter', JSON.stringify(this.state.filter));
  //   }
  // }

  const handleAddContact = contact => {
    const contactExists = contacts.some(
      existingName =>
        existingName.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${contact.name} is already exist`);
      return;
    }

    const id = nanoid();
    const newContact = { ...contact, id };
    this.setState(prev => ({
      contacts: [...prev.contacts, newContact],
    }));
  };

  const handleFilterChange = filterValue => {
    setFilter(filterValue);
    // this.setState({ filter: filterValue });
    // console.log(filterValue);
  };

  const getfilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    // this.setState(prev => ({
    //   contacts: prev.contacts.filter(contact => contact.id !== id),
    // }));
  };

  // render() {
  //   const filteredContacts = this.getfilteredContacts();
  //   const { filter } = this.state;
  const filteredContacts = getfilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <InputContacts onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeValue={handleFilterChange} />
      <Contacts
        options={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
