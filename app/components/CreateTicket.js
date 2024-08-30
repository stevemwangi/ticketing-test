import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../lib/firebase';

import UserList from './UserList';

export default function CreateTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tickets"), {
        title,
        description,
        priority,
        status: assignedTo ? 'in_progress' : 'open',
        createdBy: auth.currentUser.uid,
        assignedTo: assignedTo || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setTitle('');
      setDescription('');
      setPriority('low');
      setAssignedTo('');
    } catch (error) {
      console.error("Error adding ticket", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... other input fields ... */}
      <UserList onSelectUser={setAssignedTo} />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Create Ticket
      </button>
    </form>
  );
}