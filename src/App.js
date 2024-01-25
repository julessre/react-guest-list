import AddingGuest from './AddingGuest';
import AttendingStatus from './AttendingStatus';
import GuestList from './GuestList';
import RemoveButton from './RemoveButton';

export default function App() {
  return (
    <div>
      <h1>React Guest List</h1>
      <AddingGuest />
      <AttendingStatus />
    </div>
  );
}
