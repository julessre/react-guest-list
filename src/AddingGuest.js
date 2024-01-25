import React, { useState } from 'react';

export default function AddingGuest() {
  const [guestList, setGuestList] = useState([]);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [userID, setUserID] = useState(1);

  // Pressing Enter in Last Name submits the form
  function handleSubmit(event) {
    if (event.key === 'Enter') {
      const newUser = {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending: false,
        userID: userID,
      };
      setGuestList([...guestList, newUser]);

      setUserID(userID + 1);

      console.log('Form submitted:', {
        firstName: inputFirstName,
        lastName: inputLastName,
        isAttending,
        guestList,
        userID,
      });

      // saves Values to different variables
      setFirstName(inputFirstName);
      setLastName(inputLastName);

      // Clears input field after enter
      setInputFirstName('');
      setInputLastName('');
    }
  }

  return (
    <div>
      <form>
        <div data-test-id="guest">
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
        <div data-test-id="guest">
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
      <h2>Registered Guests</h2>
      {guestList.map((user) => (
        <div key={user.userID}>
          <div>
            First Name: {user.firstName}
            <br />
            Last Name: {user.lastName}
            <br />
            Attendance: {user.isAttending ? 'Yes' : 'No'}
            <br />
            User ID: {user.userID}
          </div>
          <hr />
        </div>
      ))}
      ;
    </div>
  );
}
