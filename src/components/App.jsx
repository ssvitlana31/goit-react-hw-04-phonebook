import React, { useEffect } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { InputContacts } from './PhoneBook/InputContacts.jsx';
import { Contacts } from './PhoneBook/ContactsList';
import { Filter } from './PhoneBook/Filter';
import { Container, Title } from './PhoneBook/Form.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(window.localStorage.getItem('contacts'));
    if (data?.length) {
      return data;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filterEL, setFilterEL] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    const res = contacts.some(el => el.name === newContact.name);
    res
      ? alert(`Name ${newContact.name} has already in the list`)
      : setContacts(prevState => [
          ...prevState,
          { id: nanoid(), ...newContact },
        ]);
  };
  const getfilteredContacts = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filterEL.toLowerCase())
    );
  };

  const handleFilterChange = e => {
    setFilterEL(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filteredContacts = getfilteredContacts(contacts);

  return (
    <Container>
      <Title>Phonebook</Title>
      <InputContacts onAddContact={handleAddContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filterEL} onChangeValue={handleFilterChange} />
      <Contacts
        options={filteredContacts}
        contacts={contacts}
        filter={filterEL}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};
