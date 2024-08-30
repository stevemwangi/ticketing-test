import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../lib/firebase';

export default function TicketDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (id) {
      const fetchTicket = async () => {
        const ticketDoc = await getDoc(doc(db, "tickets", id));
        if (ticketDoc.exists() && ticketDoc.data().createdBy === auth.currentUser?.uid) {
          setTicket({ id: ticketDoc.id, ...ticketDoc.data() });
          setTitle(ticketDoc.data().title);
          setDescription(ticketDoc.data().description);
          setPriority(ticketDoc.data().priority);
        } else {
          router.push('/'); // Redirect if ticket doesn't exist or user doesn't own it
        }
      };
      fetchTicket();
    }
  }, [id]);

  const updateTicket = async (e) => {
    e.preventDefault();
    if (!ticket) return;

    try {
      await updateDoc(doc(db, "tickets", ticket.id), {
        title,
        description,
        priority,
        updatedAt: new Date()
      });
      router.push('/');
    } catch (error) {
      console.error("Error updating ticket", error);
    }
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <form onSubmit={updateTicket} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Update Ticket
      </button>
    </form>
  );
}