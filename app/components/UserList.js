import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../lib/firebase';


export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <select onChange={(e) => onSelectUser(e.target.value)} className="w-full p-2 border rounded">
      <option value="">Assign to...</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  );
}