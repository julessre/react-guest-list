import React, { useState } from 'react';

export default function AddingGuest() {
  // const initialGuest = [];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSubmit(event) {
    if (event.key === 'Enter') {
      console.log('Form submitted:', { firstName, lastName });
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
              onChange={(event) => setFirstName(event.target.value)}
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
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={handleSubmit}
            />
          </label>
        </div>
      </form>
    </div>
  );
}
