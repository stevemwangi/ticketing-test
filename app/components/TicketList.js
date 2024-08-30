import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../lib/firebase';
import Link from 'next/link';
import UserList from './UserList';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setTickets(ticketList);
    });
    return () => unsubscribe();
  }, []);

  const assignTicket = async (ticketId, userId) => {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, {
        assignedTo: userId,
        status: 'in_progress',
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error assigning ticket", error);
    }
  };

  const deleteTicket = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteDoc(doc(db, "tickets", ticketId));
      } catch (error) {
        console.error("Error deleting ticket", error);
      }
    }    

  }

  return (
    <div className="space-y-4">
      {tickets.map(ticket => (
        <div key={ticket.id} className="p-4 border rounded">
          <h3 className="font-bold">{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
          <p>Assigned to: {ticket.assignedTo || 'Unassigned'}</p>
          <UserList onSelectUser={(userId) => assignTicket(ticket.id, userId)} />

          <div className="mt-2 space-x-2">
            <Link legacyBehavior href={`/tickets/${ticket.id}`}>
              <a className="text-blue-500 hover:underline">Edit</a>
            </Link>
            <button 
              onClick={() => deleteTicket(ticket.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}