import './App.css';
import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  const [guestList, setGuestList] = useState([]);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [userID, setUserID] = useState(1);
  const baseUrl = 'http://localhost:4000';

  //like victor says, comparing it with the docs line by line, character by character can help
  // maybe the baseUrl is not complete? I don’t know

  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuestList(allGuests);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);
  //   console.log('Updated Guest List:', guestList);

  // }, [guestList];

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

      // saves Values to different variables
      setFirstName(inputFirstName);
      setLastName(inputLastName);

      // Clears input field after enter
      setInputFirstName('');
      setInputLastName('');
    }
  }

  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    const newGuests = [...guestList];
    newGuests.push(createdGuest);
    setGuestList(newGuests);
  }

  // Sets attending to false/true for only one user
  function toggleAttending(userIDToggle) {
    setGuestList((prevList) =>
      prevList.map((user) =>
        user.userID === userIDToggle
          ? { ...user, isAttending: !user.isAttending }
          : user,
      ),
    );
  }
  // deletes only one user after click on remove
  function handleRemove(userID) {
    const newGuestList = guestList.filter((user) => user.userID !== userID);
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
              className="Inputfields"
              value={inputLastName}
              onChange={(event) => setInputLastName(event.target.value)}
              onKeyDown={handleSubmit}
            />
          </label>
        </div>
      </form>
      <div className="Guests">
        <h2>Registered Guests</h2>
        {guestList.map((user) => (
          <div
            key={`user-${user.userID}`}
            data-test-id="guest"
            className="output"
          >
            <div>
              First Name: {user.firstName}
              <br />
              Last Name: {user.lastName}
              <br />
              Attendance: {JSON.stringify(user.isAttending)}
              <br />
              <label key={`user-${user.userID}`}>
                Attending:
                <input
                  type="checkbox"
                  checked={user.isAttending}
                  value={`user-${user.userID}`}
                  aria-label={`${firstName}${lastName} is ${isAttending}`}
                  onChange={() => toggleAttending(user.userID)}
                />
              </label>
              <br />
              User ID: {user.userID}
            </div>
            <button
              type="button"
              aria-label={`Remove ${firstName}${lastName}`}
              onClick={() => handleRemove(user.userID)}
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
