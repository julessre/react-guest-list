import React, { useState } from 'react';

export default function AddingGuest() {
  const [guestList, setGuestList] = useState('');
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  function handleSubmit(event) {
    if (event.key === 'Enter') {
      const newUser = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false,
      };
      console.log('Form submitted:', {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending,
      });

      setFirstName(inputFirstName);
      setLastName(inputLastName);

      setGuestList([...guestList, newUser]);

      setInputFirstName('');
      setInputLastName('');
    }
  }

  return (
    <div>
      <h1>React Guest List</h1>
      <form>
        <div>
          <label>
            First name
            <br />
            <input
              name="firstname"
              placeholder="Enter your first name"
              value={inputFirstName}
              onChange={(event) => setInputFirstName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last name
            <br />
            <input
              name="lastname"
              placeholder="Enter your last name"
              value={inputLastName}
              onChange={(event) => setInputLastName(event.target.value)}
              onKeyDown={handleSubmit}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
