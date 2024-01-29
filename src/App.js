import './App.css';
import React, { useEffect, useState } from 'react';

export default function AddingGuest() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl =
    'https://14ac70e1-c69e-4cbb-b11f-b7677567d1c1-00-lxz0ae3q0o09.picard.replit.dev/guests';

  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setGuestList(allGuests);
      setIsLoading(false);
    }
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);

  // Creating a new guest and adding it to the API
  async function createGuest() {
    const response = await fetch(`${baseUrl}/`, {
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
  }

  // Sets attending to false/true for only one user
  async function toggleAttending(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending }),
    });
    const updatedGuest = await response.json();

    setGuestList((prevList) =>
      prevList.map((user) =>
        user.id === updatedGuest.id
          ? { ...user, attending: !user.attending }
          : user,
      ),
    );
    setAttending(!updatedGuest.attending);
  }

  // deletes only one user after click on remove
  async function cancelGuest(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guestList.filter(
      (user) => user.id !== deletedGuest.id,
    );
    setGuestList(newGuestList);
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="container" data-test-id="guest">
        <h1>React Guest List</h1>
        <form>
          <div>
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
          <div>
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
            <div
              key={`user-${user.id}`}
              data-test-id="guest"
              className="output"
            >
              <div>
                First Name: {user.firstName}
                <br />
                Last Name: {user.lastName}
                <br />
                Attendance: {JSON.stringify(user.attending)}
                <br />
                <label key={`user-${user.id}`}>
                  Attending:
                  <input
                    type="checkbox"
                    checked={user.attending}
                    value={`user-${user.id}`}
                    aria-label={`${user.firstName} ${user.lastName} attending status`}
                    onChange={() => toggleAttending(user.id)}
                  />
                </label>
                <br />
              </div>
              <button
                type="button"
                aria-label={`Remove ${user.firstName} ${user.lastName}`}
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
}
