import './App.css';
import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  const [guestList, setGuestList] = useState([]);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const baseUrl = 'http://localhost:4000';

  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuestList(allGuests);
    }
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);
  //   console.log('Updated Guest List:', guestList);

  // }, [guestList];

  async function createGuest() {
    // const newUser = {
    //   firstName: inputFirstName,
    //   lastName: inputLastName,
    //   isAttending: false,
    // };
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const addedGuest = await response.json();
    const newGuests = [...guestList];
    newGuests.push(addedGuest);
    setGuestList(newGuests);

    // saves Values to different variables
    // setFirstName(inputFirstName);
    // setLastName(inputLastName);

    // Clears input field after enter
    setInputFirstName('');
    setInputLastName('');
  }

  // Pressing Enter in Last Name submits the form
  // function handleSubmit(event) {
  //   if (event.key === 'Enter') {
  //     createGuest().catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  // Sets attending to false/true for only one user
  function toggleAttending(userIDToggle) {
    setGuestList((prevList) =>
      prevList.map((user) =>
        user.id === userIDToggle
          ? { ...user, isAttending: !user.isAttending }
          : user,
      ),
    );
  }
  // deletes only one user after click on remove
  async function cancelGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guestList.filter(
      (user) => user.id !== deletedGuest.id,
    );
    setGuestList(newGuestList);
  }

  return (
    <div className="container">
      <h1>React Guest List</h1>
      <form>
        <div data-test-id="guest">
          <label>
            First name
            <br />
            <input
              name="firstname"
              placeholder="Enter your first name"
              className="Inputfields"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
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
              className="Inputfields"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setFirstName('');
                  setLastName('');
                  createGuest().catch((error) => {
                    console.log(error);
                  });
                }
              }}
            />
          </label>
        </div>
      </form>
      <div className="Guests">
        <h2>Registered Guests</h2>
        {guestList.map((user) => (
          <div key={`user-${user.id}`} data-test-id="guest" className="output">
            <div>
              First Name: {user.firstName}
              <br />
              Last Name: {user.lastName}
              <br />
              Attendance: {JSON.stringify(user.isAttending)}
              <br />
              <label key={`user-${user.id}`}>
                Attending:
                <input
                  type="checkbox"
                  checked={user.isAttending}
                  value={`user-${user.id}`}
                  aria-label={`${firstName}${lastName} is ${isAttending}`}
                  onChange={() => toggleAttending(user.id)}
                />
              </label>
              <br />
              User ID: {user.id}
            </div>
            <button
              type="button"
              aria-label={`Remove ${firstName}${lastName}`}
              onClick={() => {
                cancelGuest(user.id).catch((error) => {
                  console.log(error);
                });
              }}
            >
              Remove
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
