import React, { useEffect } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { InputContacts } from './PhoneBook/InputContacts.jsx';
import { Contacts } from './PhoneBook/ContactsList';
import { Filter } from './PhoneBook/Filter';
import { Container, Title } from './PhoneBook/Form.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      return;
    }
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    // const id = nanoid();
    // const newContact = { ...contact, id };
    const existContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existContact) {
      alert(`${newContact.name} is already exist`);
    } else {
      setContacts(prev => [...prev, ...newContact]);
    }
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const getfilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = getfilteredContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <InputContacts onAddContact={handleAddContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChangeValue={handleFilterChange} />
      <Contacts
        options={filteredContacts}
        contacts={contacts}
        filter={filter}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
